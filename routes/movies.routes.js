import express from 'express'
const moviesRouter = express.Router()

moviesRouter.get('/')
moviesRouter.get('/movies/list')

export default moviesRouter