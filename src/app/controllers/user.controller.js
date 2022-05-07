const Show = require('../schemas/Shows')
const Movie = require('../schemas/Movies')
const TMDBMovie = require('../../services/tmdb/movies')
const posterPathUrl = 'https://image.tmdb.org/t/p/original/';
class UserController {
  getProfilePage(req, res, next) {
    res.render('profile');
  }

  getSettingsPage(req, res, next) {
    res.render('settings');
  }

  async getMoviesListPage(req, res, next) {
    const { userId } = req.cookies
    console.log(userId)
    const list = await Movie.find({userId})
    console.log(list)
    res.render('userMovieList', {
      list,
      posterPathUrl
    });
  }

  getShowsListPage(req, res, next) {
    res.render('userShowsList');
  }

  async addMovieToList(req, res, next) {
    const { id, score } = req.body;
    const { userId } = req.cookies


    try {
      const movieDetails = await TMDBMovie.getMovieDetails(id)
      const movieToBeSaved = new Movie({
        userId,
        userScore: score,
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
      res.status(201).json(movieToBeSaved)
    } catch(error) {
      console.log(error)
      res.status(400).json({
        msg: 'Item already on list.'
      })
    }

  }
}

module.exports = new UserController();
