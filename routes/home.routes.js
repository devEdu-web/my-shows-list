import {getHomePage} from '../app/home/home.controller.js'
import express from 'express'
const homeRouter = express.Router()

homeRouter.get('/home', getHomePage)

export default homeRouter