const express = require('express')
const multer = require('multer')
const UserController = require('../app/controllers/user.controller.js')
const { isUserAuthorized } = require('../app/middlewares/permissions')
const { doesUserHaveMovieInList } = require('../app/middlewares/userList')
const { fileStorage, fileFilter } = require('../app/multerConfig/main')
const { updatePasswordValidation, updateEmailValidation } = require('../app/middlewares/validation');
const userRouter = express.Router()

const upload = multer({
  storage: fileStorage,
  fileFilter
})

userRouter.get('/list/movies', isUserAuthorized, UserController.getMoviesListPage)
userRouter.get('/list/shows', isUserAuthorized, UserController.getShowsListPage)
userRouter.get('/settings', isUserAuthorized, UserController.getSettingsPage)
userRouter.get('/list/shows/edit/:id', UserController.getEditShowPage)
userRouter.get('/list/movies/edit/:id', UserController.getEditMoviePage)

userRouter.post('/settings/newPassword', updatePasswordValidation, UserController.updatePassword)
userRouter.post('/settings/newEmail', updateEmailValidation, UserController.updateEmail)
userRouter.post('/settings/newUsername')
userRouter.post('/settings/newPicture', upload.single('updatedPicture'), UserController.updatePicture)
userRouter.post('/list/movies/add', isUserAuthorized, doesUserHaveMovieInList, UserController.addMovieToList)
userRouter.post('/list/shows/add/', isUserAuthorized, UserController.addShowToList)
userRouter.post('/list/shows/update', isUserAuthorized, UserController.updateShow)
userRouter.post('/list/movies/update/', isUserAuthorized, UserController.updateMovie)

userRouter.get('/list/movies/delete/:id', isUserAuthorized, UserController.deleteMovie)
userRouter.get('/list/shows/delete/:id', isUserAuthorized, UserController.deleteShow)
module.exports = userRouter