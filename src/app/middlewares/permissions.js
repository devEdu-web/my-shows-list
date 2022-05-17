const jwt = require('jsonwebtoken');

function isUserAuthorized(req, res, next) {
  const { user } = req.session
  if(!user) 
    return res.redirect(302, '/auth/login')
  next()
}

function isUserAuthenticated(req, res, next) {
  const { user } = req.session;
  if(user) 
    return res.redirect(302, '/home')
  next()
}

module.exports = {
  isUserAuthorized,
  isUserAuthenticated,
};
