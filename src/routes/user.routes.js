const express = require('express')
const UserController = require('../app/controllers/user.controller.js')
const { isUserAuthorized } = require('../app/middlewares/permissions')
const userRouter = express.Router()

userRouter.get('/list/movies', isUserAuthorized, UserController.getMoviesListPage)
userRouter.get('/list/shows', isUserAuthorized, UserController.getShowsListPage)
userRouter.get('/profile', isUserAuthorized, UserController.getProfilePage)
userRouter.get('/settings', isUserAuthorized, UserController.getSettingsPage)

module.exports = userRouter