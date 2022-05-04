const Movie = require('../../services/tmdb/movies')
const posterPathUrl = 'https://image.tmdb.org/t/p/original/'

class moviesController {
  async movieDetailsHandler(req, res, next) {
    const {id} = req.params
    try {
      const movieDetails = await Movie.getMovieDetails(id)
      res.render('details', {
        posterPathUrl,
        details: movieDetails
      })
    } catch(error) {
      res.send('not found')
    }
  }
}

module.exports = new moviesController()