const { getSearchResult, getShowDetails } = require('../app/controllers/search.controller.js')
const express = require('express')
const searchRouter = express.Router()

searchRouter.get('/', getSearchResult)
searchRouter.get('/details', getShowDetails) // Todo add show id to the route

module.exports = searchRouter