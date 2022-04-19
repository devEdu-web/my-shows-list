import express from 'express'
const searchRouter = express.Router()

searchRouter.get('/movie')
searchRouter.get('/show')


export default searchRouter