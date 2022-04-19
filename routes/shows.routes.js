import express from 'express'
const showsRouter = express.Router()

showsRouter.get('/')
showsRouter.get('/list')

export default showsRouter