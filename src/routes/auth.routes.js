const express = require('express');

const { 
  isUserAuthenticated,
  registerValidation
} = require('../app/middlewares')

const {getRegisterPage, getLoginPage, saveUser, logUser, logout} = require('../app/controllers/auth.controller.js');
const authRouter = express.Router();


authRouter.get('/register', isUserAuthenticated, getRegisterPage)
authRouter.get('/login', isUserAuthenticated, getLoginPage)
authRouter.get('/logout', logout)
authRouter.post('/register', isUserAuthenticated, registerValidation, saveUser)
authRouter.post('/login', isUserAuthenticated, logUser)

module.exports = authRouter