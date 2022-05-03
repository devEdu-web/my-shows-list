const Movie = require('../../services/tmdb/movies')
const posterPathUrl = 'https://image.tmdb.org/t/p/original/'

async function getHomePage(req, res, next) {
    const movies = new Movie()
    const popularMovies = await movies.getPopularMovies()
    const topRatedMovies = await movies.getTopRatingMovies()
    res.render('home', {
        posterPathUrl,
        popularMovies: popularMovies.results,
        topRatedMovies: topRatedMovies.results
    })
}

module.exports = {
    getHomePage
}