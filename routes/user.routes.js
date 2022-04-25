import express from 'express'
import { getProfile, getSettingsPage, getUserListPage } from '../app/controllers/user.controller.js'
const userRouter = express.Router()

userRouter.get('/list/movies', getUserListPage)
userRouter.get('/list/shows')
userRouter.get('/profile', getProfile)
userRouter.get('/settings', getSettingsPage)

export default userRouter