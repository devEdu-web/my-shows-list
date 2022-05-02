const { getSearchResult, getShowDetails } = require('../app/controllers/search.controller.js');
const { isUserAuthorized } = require('../app/middlewares/permissions')
const express = require('express')
const searchRouter = express.Router()

searchRouter.get('/', isUserAuthorized, getSearchResult)
searchRouter.get('/details', isUserAuthorized, getShowDetails) // Todo add show id to the route

module.exports = searchRouter