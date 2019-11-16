const parseCookies = (req, res, next) => {
  if ((req.headers.cookie) !== undefined) { // if cookie not found, ask user to login
    let cookiesStr = req.headers.cookie;
    let parsedCookieArr = cookiesStr.split('; ');
    for (var i = 0; i < parsedCookieArr.length; i++) {
      let splitCookie = parsedCookieArr[i].split('=');
      req.cookies[splitCookie[0]] = splitCookie[1];
    }
  }
  next();
};

module.exports = parseCookies;