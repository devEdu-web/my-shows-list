import { getSearchResult } from '../app/movies/movies.controller.js'
import express from 'express'
const searchRouter = express.Router()

searchRouter.get('/', getSearchResult)


export default searchRouter