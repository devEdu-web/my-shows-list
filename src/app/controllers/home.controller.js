const Movie = require('../../services/tmdb/movies')
const Show =  require('../../services/tmdb/shows')
const posterPathUrl = 'https://image.tmdb.org/t/p/original/'

async function getHomePage(req, res, next) {
    const popularMovies = await Movie.getPopularMovies()
    const topRatedMovies = await Movie.getTopRatingMovies()
    const popularShows = await Show.getPopularShows()
    const topRatedShows = await Show.getTopRatedShows()

    res.render('home', {
        posterPathUrl,
        popularMovies: popularMovies.results,
        topRatedMovies: topRatedMovies.results,
        popularShows: popularShows.results,
        topRatedShows: topRatedShows.results
    })
}

module.exports = {
    getHomePage
}