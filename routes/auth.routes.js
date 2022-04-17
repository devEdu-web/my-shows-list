import express from 'express';
import {getRegisterPage} from '../app/auth/auth.controller.js';
const authRouter = express.Router();


authRouter.get('/register', getRegisterPage)


export default authRouter