const { searchResult, getDetails } = require('../app/controllers/search.controller.js');
const { isUserAuthorized } = require('../app/middlewares/permissions')
const express = require('express')
const searchRouter = express.Router()

searchRouter.get('/', isUserAuthorized, searchResult)
searchRouter.get('/details/:id', getDetails)

module.exports = searchRouter