const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2
const { validationResult } = require('express-validator');
const Show = require('../schemas/Shows');
const Movie = require('../schemas/Movies');
const User = require('../schemas/User');
const TMDBMovie = require('../../services/tmdb/movies');
const TMDBShow = require('../../services/tmdb/shows');

class UserController {
  getSettingsPage(req, res, next) {
    const { userName } = req.session.user
    const { profilePictureUrl } = req.session.user
    return res.render('user/settings', {
      profilePictureUrl,
      userName
    });
  }

  async getEditShowPage(req, res, next) {
    const { id } = req.params;
    const { userId } = req.session.user;
    const { userName } = req.session.user
    const { profilePictureUrl } = req.session.user
    try {
      const show = await Show.findOne({ showId: id, userId: userId });
      const showCast = await TMDBShow.getCast(id)
      const recommendations = await TMDBShow.getRecommendations(id)
      return res.render('user/editShow', {
        profilePictureUrl,
        userName,
        posterPathUrl: TMDBMovie.posterPathUrl,
        show: show,
        type: 'show',
        cast: showCast.cast,
        recommendations: recommendations.results
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message
      })
    }
  }

  async getEditMoviePage(req, res, next) {
    const { id } = req.params;
    const { userId } = req.session.user;
    const { userName } = req.session.user
    const { profilePictureUrl } = req.session.user
    
    try {
      const movie = await Movie.findOne({ movieId: id, userId: userId });
      const movieCast = await TMDBMovie.getCast(id)
      const recommendations = await TMDBMovie.getRecommendations(id)

      res.render('user/editMovie', {
        profilePictureUrl,
        userName,
        posterPathUrl: TMDBMovie.posterPathUrl,
        movie: movie,
        type: 'movie',
        cast: movieCast.cast,
        recommendations: recommendations.results
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message
      })
    }
  }

  async updatePassword(req, res, next) {
    const { userId } = req.session.user;
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
    const { userId } = req.session.user;
    const { newEmail, currentPassword } = req.body;

    try {
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
    const { userId } = req.session.user
    const picture = req.files.updatedPicture

    try {
      const savedPicture = await cloudinary.uploader.upload(picture.tempFilePath, {
        public_id: userId,
        folder: 'my_shows_list'
      })

      const userUpdated = await User.findOneAndUpdate({_id: userId}, {
        profilePictureUrl: savedPicture.url
      }, { new: true })

      req.session.user.profilePictureUrl = userUpdated.profilePictureUrl

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
    const { userId } = req.session.user;
    const { userName } = req.session.user
    const { profilePictureUrl } = req.session.user
    try {
      const moviesList = await Movie.find({ userId });
      // console.log(moviesList)
      return res.render('user/userMovieList', {
        profilePictureUrl,
        userName,
        quantity: moviesList.length,
        moviesList: moviesList.reverse(),
        posterPathUrl: TMDBMovie.posterPathUrl,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message
      });
    }
  }

  async getShowsListPage(req, res, next) {
    const { userId } = req.session.user;
    const { userName } = req.session.user
    const { profilePictureUrl } = req.session.user
    try {
      const showsList = await Show.find({ userId });
      return res.render('user/userShowsList', {
        profilePictureUrl,
        userName,
        quantity: showsList.length,
        showsList: showsList.reverse(),
        posterPathUrl: TMDBMovie.posterPathUrl
      });
    } catch (error) {
      res.status(400).json({
        msg: error.message
      });
    }
  }

  async addMovieToList(req, res, next) {
    const { id, score } = req.body;
    const { userId } = req.session.user;

    try {
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
        genresId: movieDetails.genres
      });
      await movieToBeSaved.save();
      return res.status(201).json({
        msg: 'Movie added.',
        // movieAdded: movie
      });
    } catch (error) {
      res.status(400).json({
        msg: 'Movie already on list'
      });
    }
  }

  async updateMovie(req, res, next) {
    const { id, newScore } = req.body;
    const { userId } = req.session.user;
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
      console.log(error)
      return res.status(400).json({ msg: error.message });
    }
  }

  async deleteMovie(req, res, next) {
    const { userId } = req.session.user;
    const { id } = req.params;

    try {
      await Movie.findOneAndDelete({ userId, movieId: id });
      return res.redirect('/user/list/movies');
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }

  async addShowToList(req, res, next) {
    const { id, score } = req.body;
    const { userId } = req.session.user;
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
        genresId: showDetails.genres
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
    const { userId } = req.session.user;

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
      return res.status(500).json({ msg: error.message });
    }
  }

  async deleteShow(req, res, next) {
    const { userId } = req.session.user;
    const { id } = req.params;

    try {
      await Show.findOneAndDelete({ userId, showId: id });
      res.redirect('/user/list/shows');
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = new UserController();


// TODO: Add the userId and other user info into an object somewhere  