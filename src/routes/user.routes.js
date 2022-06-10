const express = require('express')
const UserController = require('../app/controllers/user.controller.js')

const {
  checkIfEmailExists,
  doesUserHaveMovieInList,
  doesUserHaveShowInList,
  isUserAuthorized,
  updateEmailValidation,
  updatePasswordValidation,
  validatePicture
} = require('../app/middlewares/index')

const userRouter = express.Router()

userRouter.get('/list/movies', isUserAuthorized, UserController.getMoviesListPage)
userRouter.get('/list/shows', isUserAuthorized, UserController.getShowsListPage)
userRouter.get('/settings', isUserAuthorized, UserController.getSettingsPage)
userRouter.get('/list/shows/edit/:id', UserController.getEditShowPage)
userRouter.get('/list/movies/edit/:id', UserController.getEditMoviePage)

userRouter.post('/settings/newPassword', updatePasswordValidation, UserController.updatePassword)
userRouter.post('/settings/newEmail', updateEmailValidation, checkIfEmailExists, UserController.updateEmail)
userRouter.post('/settings/newUsername')
userRouter.post('/settings/newPicture', validatePicture, UserController.updatePicture)
userRouter.post('/list/movies/add', isUserAuthorized, doesUserHaveMovieInList, UserController.addMovieToList)
userRouter.post('/list/shows/add/', isUserAuthorized, doesUserHaveShowInList, UserController.addShowToList)
userRouter.post('/list/shows/update', isUserAuthorized, UserController.updateShow)
userRouter.post('/list/movies/update/', isUserAuthorized, UserController.updateMovie)

userRouter.get('/list/movies/delete/:id', isUserAuthorized, UserController.deleteMovie)
userRouter.get('/list/shows/delete/:id', isUserAuthorized, UserController.deleteShow)
module.exports = userRouter