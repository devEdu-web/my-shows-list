const showsRouter = require('express').Router()
const { showDetailsHandler } = require('../app/controllers/shows.controller')


showsRouter.get('/details/:id', showDetailsHandler)

module.exports = showsRouter