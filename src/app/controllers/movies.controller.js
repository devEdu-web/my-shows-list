const Movie = require('../../services/tmdb/movies')
// const movieClass = new Movie()
const posterPathUrl = 'https://image.tmdb.org/t/p/original/'

class moviesController {
  async movieDetailsHandler(req, res, next) {
    const {id} = req.params
    try {
      const Movie = await movieClass.getMovieDetails(id)
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