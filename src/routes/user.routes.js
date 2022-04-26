import express from 'express'
import UserController from '../app/controllers/user.controller.js'
const userRouter = express.Router()

userRouter.get('/list/movies', UserController.getMoviesListPage)
userRouter.get('/list/shows', UserController.getShowsListPage)
userRouter.get('/profile', UserController.getProfilePage)
userRouter.get('/settings', UserController.getSettingsPage)

export default userRouter