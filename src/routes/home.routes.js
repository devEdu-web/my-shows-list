const {getHomePage} = require('../app/controllers/home.controller.js')
const { isUserAuthorized } = require('../app/middlewares/index')
// const Middleware = require('../app/middlewares/main')
const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/home', isUserAuthorized, getHomePage)

module.exports = homeRouter