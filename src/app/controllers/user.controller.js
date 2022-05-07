const Show = require('../schemas/Shows')
const Movie = require('../schemas/Movies')
const TMDBMovie = require('../../services/tmdb/movies')
class UserController {
  getProfilePage(req, res, next) {
    res.render('profile');
  }

  getSettingsPage(req, res, next) {
    res.render('settings');
  }

  getMoviesListPage(req, res, next) {
    res.render('userMovieList');
  }

  getShowsListPage(req, res, next) {
    res.render('userShowsList');
  }

  async addMovieToList(req, res, next) {
    const { id } = req.body;
    const { userId } = req.cookies

    try {
      const movieDetails = await TMDBMovie.getMovieDetails(id)
      const movieToBeSaved = new Movie({
        userId,
        movieId: id,
        title: movieDetails.original_title,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        popularity: movieDetails.popularity,
        voteAverage: movieDetails.vote_average,
        voteCount: movieDetails.vote_count,
        releaseDate: movieDetails.release_date
      })
      const movie = await movieToBeSaved.save()
      res.json(movieToBeSaved)
    } catch(error) {
      console.log(error)
      res.send(error)
    }

  }
}

module.exports = new UserController();
