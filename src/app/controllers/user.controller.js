const Show = require('../schemas/Shows');
const Movie = require('../schemas/Movies');
// const User = require('../schemas/Movies')
const TMDBMovie = require('../../services/tmdb/movies');
const TMDBShow = require('../../services/tmdb/shows');
const posterPathUrl = 'https://image.tmdb.org/t/p/original/';
class UserController {
  getProfilePage(req, res, next) {
    res.render('profile');
  }

  getSettingsPage(req, res, next) {
    res.render('settings');
  }

  async getMoviesListPage(req, res, next) {
    const { userId } = req.cookies;
    try {
      const moviesList = await Movie.find({ userId });
      res.render('userMovieList', {
        moviesList,
        posterPathUrl,
      });
    } catch (error) {
      res.json(error);
    }
  }

  async getShowsListPage(req, res, next) {
    const { userId } = req.cookies;
    try {
      const showsList = await Show.find({ userId });
      res.render('userShowsList', {
        showsList,
        posterPathUrl,
      });
    } catch (error) {
      res.json(error);
    }
  }

  async addMovieToList(req, res, next) {
    const { id, score } = req.body;
    const { userId } = req.cookies;

    try {
      const movieExistsInUserList = await Movie.findOne({ movieId: id });
      const movieDetails = await TMDBMovie.getMovieDetails(id);
      if (movieExistsInUserList)
        return res.status(400).json({ msg: 'Item already on list.' });

      const movieToBeSaved = new Movie({
        userId,
        userScore: score,
        movieId: id,
        title: movieDetails.original_title,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        popularity: movieDetails.popularity,
        voteCount: movieDetails.vote_count,
      });
      const movie = await movieToBeSaved.save();
      res.status(201).json(movieToBeSaved);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  async addShowToList(req, res, next) {
    const { id, score } = req.body;
    const { userId } = req.cookies;
    try {
      const showExistsInUserList = await Show.findOne({ showId: id });
      if (showExistsInUserList)
        return res.status(400).json({ msg: 'Item already on list' });

      const showDetails = await TMDBShow.getShowDetails(id);
      const showToBeSaved = new Show({
        userId,
        userScore: score,
        showId: showDetails.id,
        showTitle: showDetails.name,
        overview: showDetails.overview,
        posterPath: showDetails.poster_path,
        popularity: showDetails.popularity,
        voteCount: showDetails.vote_count,
      });
      const show = await showToBeSaved.save();
      return res.status(201).json(show);
    } catch (error) {
      return res.status(400).json({
        msg: 'Item already on list.',
      });
    }
  }
}

module.exports = new UserController();
