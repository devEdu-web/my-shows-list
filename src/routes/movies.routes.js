const moviesRouter = require('express').Router()
const { movieDetailsHandler } = require('../app/controllers/movies.controller')

moviesRouter.get('/details/:id', movieDetailsHandler)


module.exports = moviesRouter