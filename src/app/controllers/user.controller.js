const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2
const { validationResult } = require('express-validator');
const Show = require('../schemas/Shows');
const Movie = require('../schemas/Movies');
const User = require('../schemas/User');
const TMDBMovie = require('../../services/tmdb/movies');
const TMDBShow = require('../../services/tmdb/shows');
const posterPathUrl = 'https://image.tmdb.org/t/p/original/';

class UserController {
  getSettingsPage(req, res, next) {
    const { userName } = req.cookies
    const { profileUrl } = req.cookies
    res.render('settings', {
      profileUrl,
      userName
    });
  }

  async getEditShowPage(req, res, next) {
    const { id } = req.params;
    const { userId } = req.cookies;
    const { userName } = req.cookies
    const { profileUrl } = req.cookies
    try {
      const show = await Show.findOne({ showId: id, userId: userId });
      res.render('editShow', {
        profileUrl,
        userName,
        posterPathUrl,
        show: show,
        type: 'show',
      });
    } catch (error) {
      throw error
    }
  }

  async getEditMoviePage(req, res, next) {
    const { id } = req.params;
    const { userId } = req.cookies;
    const { userName } = req.cookies
    const { profileUrl } = req.cookies

    try {
      const movie = await Movie.findOne({ movieId: id, userId: userId });
      res.render('editMovie', {
        profileUrl,
        userName,
        posterPathUrl,
        movie: movie,
        type: 'movie',
      });
    } catch (error) {
      throw error
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

  async updatePicture(req, res, next) {
    const { userId } = req.cookies
    const picture = req.file

    // TODO: add this validation to a middleware

    if(!picture) return res.status(400).json({
      msg: 'Size or format not supported.'
    })

    if(picture.size > 2000000) {
      return res.status(400).json({
        msg: 'Size or format not supported.'
      })
    }

    try {
      const savedPicture = await cloudinary.uploader.upload(picture.path, {
        public_id: userId,
        folder: 'my_shows_list'
      })

      const userUpdated = await User.findOneAndUpdate({_id: userId}, {
        profilePictureUrl: savedPicture.url
      }, { new: true })

      res.cookie('profileUrl', userUpdated.profilePictureUrl)

      return res.status(201).json({
        msg: 'Picture Uploaded'
      })

    } catch(error) {
      console.log(error)
      res.status(400).json({
        msg: error.message
      })
    }
  }

  async getMoviesListPage(req, res, next) {
    const { userId } = req.cookies;
    const { userName } = req.cookies
    const { profileUrl } = req.cookies
    try {
      const moviesList = await Movie.find({ userId });
      res.render('userMovieList', {
        profileUrl,
        userName,
        quantity: moviesList.length,
        moviesList,
        posterPathUrl,
      });
    } catch (error) {
      res.json(error);
    }
  }

  async getShowsListPage(req, res, next) {
    const { userId } = req.cookies;
    const { userName } = req.cookies
    const { profileUrl } = req.cookies
    try {
      const showsList = await Show.find({ userId });
      res.render('userShowsList', {
        profileUrl,
        userName,
        quantity: showsList.length,
        showsList,
        posterPathUrl,
      });
    } catch (error) {
      res.status(400).json({
        msg: error.message
      });
    }
  }

  async addMovieToList(req, res, next) {
    const { id, score } = req.body;
    const { userId } = req.cookies;

    try {
      /* TODO: If the user does not have a movie/show in they're list it may be a good idea send the response to the user saying that the movie is added, and save the movie into the database on the background, after the response is sent. On second thought, if there is an error while saving the show/movie the response that it was added will be sent and the movie won't be save. */

      const movieDetails = await TMDBMovie.getMovieDetails(id);

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
      await movieToBeSaved.save();
      res.status(201).json({
        msg: 'Movie added.',
        // movieAdded: movie
      });
    } catch (error) {
      console.log(error)
      res.status(400).json({
        msg: 'Movie already on list'
      });
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
      if(movie) {
        return res.status(201).json({ msg: 'Movie Updated' });
      }
      return res.status(400).json({
        msg: 'Movies does not exist in the user list.'
      })
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  async deleteMovie(req, res, next) {
    const { userId } = req.cookies;
    const { id } = req.params;

    try {
      await Movie.findOneAndDelete({ userId, movieId: id });
      res.redirect('/user/list/movies');
    } catch (error) {
      res.json({ msg: error.message });
      throw error;
    }
  }

  async addShowToList(req, res, next) {
    const { id, score } = req.body;
    const { userId } = req.cookies;
    try {
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
      return res.status(201).json({
        msg: 'Show added.',
        showAdded: show
      });
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
      const show = await Show.findOneAndUpdate(
        { userId: userId, showId: id },
        {
          userScore: newScore,
        }
      );
      if(show) {
        return res.status(201).json({ msg: 'Show Updated' });
      }
      return res.status(400).json({msg: 'Show does not exist in user list.'})
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async deleteShow(req, res, next) {
    const { userId } = req.cookies;
    const { id } = req.params;

    try {
      await Show.findOneAndDelete({ userId, showId: id });
      res.redirect('/user/list/shows');
    } catch (error) {
      res.json({ msg: error.message });
      throw error;
    }
  }
}

module.exports = new UserController();
