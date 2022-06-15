const express = require('express');
const { isUserAuthenticated, registerValidation, isUserEmailVerified } = require('../app/middlewares/index.js')

const {getRegisterPage, getLoginPage, saveUser, logUser, logout, getGoogleConsentScreen, googleCallbackHandler, getConfirmationPage, confirmationHandler } = require('../app/controllers/auth.controller.js');
const authRouter = express.Router();


authRouter.get('/register', isUserAuthenticated, getRegisterPage)
authRouter.get('/login', isUserAuthenticated, getLoginPage)
authRouter.get('/logout', logout)
authRouter.get('/confirm', getConfirmationPage)
authRouter.get('/confirm/:token', confirmationHandler)
authRouter.post('/register', isUserAuthenticated, registerValidation, saveUser)
authRouter.post('/login', isUserAuthenticated, isUserEmailVerified, logUser)

authRouter.get('/oauth/google', getGoogleConsentScreen)
authRouter.get('/oauth/google/callback', googleCallbackHandler)

module.exports = authRouter