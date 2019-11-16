const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // console.log(req.cookies);
  // console.log('req: ', req);
  // models.Sessions.get()

  // check if req has a cookie & cookie has shortlyid
  if (req.cookies) {
    return models.Sessions.get({ hash: req.cookies['shortlyid'] })
      .then((session) => {
        if (session) {
          req.session = session;
          next();
        } else {
          models.Sessions.create()
            .then(results => {
              return models.Sessions.get({ id: results.insertId });
            })
            .then(session => {
              req.session = session;
              res.cookie('shortlyid', session.hash);
              next();
            })
            .catch(() => {
              next();
            });
        }
      });
  }

  ///////////////////////////////////
  models.Sessions.create()
    .then(results => {
      // return models.Sessions.get({})
      return models.Sessions.get({ id: results.insertId });
    })
    .then(session => {
      req.session = session;
      // res.cookies['shortlyid'] = { value: session.hash };
      res.cookie('shortlyid', session.hash);
      next();
    })
    .catch(() => {
      next();
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

// module.exports.sessionCreator = (req, res, next) => {
//   return models.Sessions.create()
//     .then(results => {
//       // return models.Sessions.get({})
//       return models.Sessions.get({ id: results.insertId });
//     })
//     .then(session => {
//       req.session = session;
//       // console.log('session:', session);
//       res.cookies['shortlyid'] = { value: session.hash };
//       // res.cookies('shortlyid', session.hash);
//       // res.cookies = session.hash;
//       // return isLoggedIn();
//       next();
//     })
//     // .then(result => {
//     //   if (result) {

//     //   }
//     // })
//     .catch(() => {
//       next();
//     });
// };
