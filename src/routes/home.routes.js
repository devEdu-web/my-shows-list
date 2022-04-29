const {getHomePage} = require('../app/controllers/home.controller.js')
const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/home', getHomePage)

module.exports = homeRouter