const express = require('express');
const {getRegisterPage, getLoginPage, saveUser, logUser, logout} = require('../app/controllers/auth.controller.js');
const { registerValidation } = require('../app/middlewares/validation');
const { isUserAuthenticated } = require('../app/middlewares/permissions')
const authRouter = express.Router();


authRouter.get('/register', isUserAuthenticated, getRegisterPage)
authRouter.get('/login', isUserAuthenticated, getLoginPage)
authRouter.get('/logout', logout)
authRouter.post('/register', isUserAuthenticated, registerValidation, saveUser)
authRouter.post('/login', isUserAuthenticated, logUser)

module.exports = authRouter