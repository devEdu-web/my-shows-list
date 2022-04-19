import express from 'express';
import {getRegisterPage, getLoginPage} from '../app/auth/auth.controller.js';
const authRouter = express.Router();


authRouter.get('/register', getRegisterPage)
authRouter.get('/login', getLoginPage)
authRouter.post('/register')
authRouter.post('/login')

export default authRouter