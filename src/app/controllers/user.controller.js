const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Show = require('../schemas/Shows');
const Movie = require('../schemas/Movies');
const User = require('../schemas/User');
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

  async getEditShowPage(req, res, next) {
    const { id } = req.params;
    const { userId } = req.cookies;
    try {
      const show = await Show.findOne({ showId: id, userId: userId });
      res.render('editShow', {
        posterPathUrl,
        show: show,
        type: 'show',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getEditMoviePage(req, res, next) {
    const { id } = req.params;
    const { userId } = req.cookies;

    try {
      const movie = await Movie.findOne({ movieId: id, userId: userId });
      res.render('editMovie', {
        posterPathUrl,
        movie: movie,
        type: 'movie',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(req, res, next) {
    const { userId } = req.cookies;
    const { newPassword, currentPassword } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    try {
      const user = await User.findById(userId);
      const doesPasswordsMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!doesPasswordsMatch) throw new Error('Wrong password.');

      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne({ _id: userId }, { password: encryptedPassword });

      return res.status(201).json({ msg: 'Password updated.' });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  async updateEmail(req, res, next) {
    const { userId } = req.cookies;
    const { newEmail, currentPassword } = req.body;

    try {
      // TODO: Maybe add this kind of code to a middleware
      const findExistingEmail = await User.findOne({ email: newEmail });
      if (findExistingEmail) throw new Error('Email already in use.');

      const user = await User.findById(userId);
      const doesPasswordsMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!doesPasswordsMatch) throw new Error('Wrong password.');

      await User.updateOne({
        _id: userId,
        email: newEmail,
      });

      return res.status(201).json({ msg: 'Email updated.' });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
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
      const movieExistsInUserList = await Movie.findOne({
        movieId: id,
        userId: userId,
      });
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

  async updateMovie(req, res, next) {
    const { id, newScore } = req.body;
    const { userId } = req.cookies;
    try {
      const movie = await Movie.findOneAndUpdate(
        { userId: userId, movieId: id },
        {
          userScore: newScore,
        }
      );
      console.log(movie);
      res.status(201).json({ msg: 'Movie Updated' });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async deleteMovie(req, res, next) {
    const { userId } = req.cookies
    const { id } = req.params

    try {
      const movie = await Movie.findOneAndDelete({ userId, movieId: id })
      res.redirect('/user/list/movies')
    } catch(error) {
      throw error
      res.json({msg: error.message})
    }

  }

  async addShowToList(req, res, next) {
    const { id, score } = req.body;
    const { userId } = req.cookies;
    try {
      const showExistsInUserList = await Show.findOne({
        showId: id,
        userId: userId,
      });
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
  async updateShow(req, res, next) {
    const { id, newScore } = req.body;
    const { userId } = req.cookies;

    try {
      await Show.findOneAndUpdate(
        { userId: userId, showId: id },
        {
          userScore: newScore,
        }
      );
      res.status(201).json({ msg: 'Show Updated' });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}

module.exports = new UserController();
