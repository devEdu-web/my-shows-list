const Movie = require('../../services/tmdb/movies')
const Show =  require('../../services/tmdb/shows')
const posterPathUrl = 'https://image.tmdb.org/t/p/original/'

async function getHomePage(req, res, next) {
    const movies = new Movie()
    const shows = new Show()
    const popularMovies = await movies.getPopularMovies()
    const topRatedMovies = await movies.getTopRatingMovies()
    const popularShows = await shows.getPopularShows()
    const topRatedShows = await shows.getTopRatedShows()

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