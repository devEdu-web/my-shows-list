const jwt = require('jsonwebtoken');

function isUserAuthorized(req, res, next) {
  const { user } = req.session
  if(!user) 
    return res.redirect(302, '/auth/login')
  next()
}

function isUserAuthenticated(req, res, next) {
  const { token } = req.cookies;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.redirect(302, '/home');
  } catch (error) {
    next();
  }
}

module.exports = {
  isUserAuthorized,
  isUserAuthenticated,
};
