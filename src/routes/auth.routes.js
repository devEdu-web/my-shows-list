const express = require('express');
const {
  isUserAuthenticated,
  registerValidation,
  resetPasswordValidation,
  isUserEmailVerified,
} = require('../app/middlewares/index.js');

const {
  getRegisterPage,
  getLoginPage,
  saveUser,
  logUser,
  logout,
  getGoogleConsentScreen,
  googleCallbackHandler,
  getConfirmationPage,
  confirmationCallbackHandler,
  getResetPasswordRequestPage,
  sendResetLinkPassword,
  resetPasswordRedirectHandler,
  resetPasswordController,
  getResetPageConfirmation,
} = require('../app/controllers/auth.controller.js');
const authRouter = express.Router();

authRouter.get('/register', isUserAuthenticated, getRegisterPage);
authRouter.get('/login', isUserAuthenticated, getLoginPage);
authRouter.get('/logout', logout);
authRouter.get('/reset/request', getResetPasswordRequestPage);
authRouter.get('/resetPage', getResetPageConfirmation);
authRouter.get('/reset/form/:token', resetPasswordRedirectHandler);
authRouter.get('/confirm', getConfirmationPage);
authRouter.get('/confirm/:token', confirmationCallbackHandler);

authRouter.post('/register', isUserAuthenticated, registerValidation, saveUser);
authRouter.post('/login', isUserAuthenticated, isUserEmailVerified, logUser);
authRouter.post('/reset/request', sendResetLinkPassword);
authRouter.post('/reset', resetPasswordValidation, resetPasswordController);

authRouter.get('/oauth/google', getGoogleConsentScreen);
authRouter.get('/oauth/google/callback', googleCallbackHandler);

module.exports = authRouter;
