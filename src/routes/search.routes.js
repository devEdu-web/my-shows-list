const { searchResult, getDetails } = require('../app/controllers/search.controller.js');
const { isUserAuthorized } = require('../app/middlewares/index')
const Middleware = require('../app/middlewares/main')
const express = require('express')
const searchRouter = express.Router()

searchRouter.get('/', isUserAuthorized, searchResult)
searchRouter.get('/details/:id', isUserAuthorized, getDetails)

module.exports = searchRouter