const express = require('express')
const UserController = require('../app/controllers/user.controller.js')
const { isUserAuthorized } = require('../app/middlewares/permissions')
const { updatePasswordValidation, updateEmailValidation } = require('../app/middlewares/validation');
const userRouter = express.Router()

userRouter.get('/list/movies', isUserAuthorized, UserController.getMoviesListPage)
userRouter.get('/list/shows', isUserAuthorized, UserController.getShowsListPage)
userRouter.get('/profile', isUserAuthorized, UserController.getProfilePage)
userRouter.get('/settings', isUserAuthorized, UserController.getSettingsPage)
userRouter.get('/list/shows/edit/:id', UserController.getEditShowPage)

// TODO: Make sure that only authenticated users are able to make post requests
userRouter.post('/settings/newPassword', updatePasswordValidation, UserController.updatePassword)
userRouter.post('/settings/newEmail', updateEmailValidation, UserController.updateEmail)
userRouter.post('/settings/newUsername')
userRouter.post('/list/movies/add', UserController.addMovieToList)
userRouter.post('/list/shows/add/', UserController.addShowToList)
userRouter.post('/list/shows/update', UserController.updateShow)
module.exports = userRouter