const express = require('express')
const UserController = require('../app/controllers/user.controller.js')
const userRouter = express.Router()

userRouter.get('/list/movies', UserController.getMoviesListPage)
userRouter.get('/list/shows', UserController.getShowsListPage)
userRouter.get('/profile', UserController.getProfilePage)
userRouter.get('/settings', UserController.getSettingsPage)

module.exports = userRouter