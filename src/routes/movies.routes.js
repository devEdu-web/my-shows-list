const moviesRouter = require('express').Router();
const { movieDetailsHandler } = require('../app/controllers/movies.controller');
const { isUserAuthorized } = require('../app/middlewares/permissions');
moviesRouter.get('/details/:id', isUserAuthorized, movieDetailsHandler);

module.exports = moviesRouter;
