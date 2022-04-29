const express = require('express');
const {getRegisterPage, getLoginPage} = require('../app/controllers/auth.controller.js');
const authRouter = express.Router();


authRouter.get('/register', getRegisterPage)
authRouter.get('/login', getLoginPage)
authRouter.post('/register')
authRouter.post('/login')

module.exports = authRouter