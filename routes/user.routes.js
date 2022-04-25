import express from 'express'
import { getProfile, getSettingsPage, getUserMoviesListPage, getUserShowsListPage } from '../app/controllers/user.controller.js'
const userRouter = express.Router()

userRouter.get('/list/movies', getUserMoviesListPage)
userRouter.get('/list/shows', getUserShowsListPage)
userRouter.get('/profile', getProfile)
userRouter.get('/settings', getSettingsPage)

export default userRouter