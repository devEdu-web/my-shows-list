import { getSearchResult, getShowDetails } from '../app/controllers/search.controller.js'
import express from 'express'
const searchRouter = express.Router()

searchRouter.get('/', getSearchResult)
searchRouter.get('/details', getShowDetails) // Todo add show id to the route

export default searchRouter