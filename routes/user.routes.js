import express from 'express'
import { getProfile, getSettingsPage } from '../app/controllers/user.controller.js'
const userRouter = express.Router()

userRouter.get('/list/movies')
userRouter.get('/list/shows')
userRouter.get('/profile', getProfile)
userRouter.get('/settings', getSettingsPage)

export default userRouter