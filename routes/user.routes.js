import express from 'express'
import { getProfile } from '../app/controllers/user.controller.js'
const userRouter = express.Router()

userRouter.get('/list/movies')
userRouter.get('/list/shows')
userRouter.get('/profile', getProfile)

export default userRouter