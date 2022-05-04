const showsRouter = require('express').Router()
const { showDetailsHandler } = require('../app/controllers/shows.controller')
const { isUserAuthorized } = require('../app/middlewares/permissions')

showsRouter.get('/details/:id', isUserAuthorized, showDetailsHandler)

module.exports = showsRouter