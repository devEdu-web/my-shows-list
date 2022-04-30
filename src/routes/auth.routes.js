const express = require('express');
const {getRegisterPage, getLoginPage, saveUser} = require('../app/controllers/auth.controller.js');
const { registerValidation } = require('../app/middlewares/validation')
const authRouter = express.Router();


authRouter.get('/register', getRegisterPage)
authRouter.get('/login', getLoginPage)
authRouter.post('/register', registerValidation, saveUser)
authRouter.post('/login')

module.exports = authRouter