const Movie = require('../schemas/Movies');
const Show = require('../schemas/Shows');
const User = require('../schemas/User')


class Middleware {
  isUserAuthorized(req, res, next) {
    const { user } = req.session
    if(!user) 
      return res.redirect(302, '/auth/login')
    next()
  }
  
  isUserAuthenticated(req, res, next) {
    const { user } = req.session;
    if(user) 
      return res.redirect(302, '/home')
    next()
  }
  
  async isUserEmailVerified(req, res, next) {
    const { email } = req.body
    try {
      const user = await User.findOne({ email })
      if(user.isVerified) 
        return next()
      res.status(403).json({
        msg: 'Email or password invalid.'
      })
    } catch(error) {
      res.status(500).json({
        msg: 'Email or password invalid'
      })
    }
  }

  async doesUserHaveMovieInList(req, res, next) {
    const { id } = req.body;
    const { userId } = req.session.user;
    try {
      const movieExistsInUserList = await Movie.findOne({
        movieId: id,
        userId: userId,
      });
      if (movieExistsInUserList)
        return res.status(400).json({ msg: 'Item already on list.' });
      next();
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
  
  async doesUserHaveShowInList(req, res, next) {
    const { id } = req.body;
    const { userId } = req.session.user;
    try {
      const showExistsInUserList = await Show.findOne({
        showId: id,
        userId: userId,
      });
      if (showExistsInUserList)
        return res.status(400).json({ msg: 'Item already on list' });
      next();
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
  
  async checkIfEmailExists(req, res, next) {
    const { newEmail } = req.body;
    try {
      const findExistingEmail = await User.findOne({ email: newEmail });
      if (findExistingEmail) 
        throw new Error('Email already in use.');
      next()
    } catch(error) {
      res.status(400).json({
        msg: error.message
      })
    }
  }
  
  validatePicture(req, res, next) {
    if(!req.files) {
      return res.status(400).json({
        msg: 'No file was selected.'
      })
    }
    const picture = req.files.updatedPicture
    const acceptedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']
  
    if(!acceptedMimeTypes.includes(picture.mimetype)) return res.status(400).json({
      msg: 'Size or format not supported.'
    })
  
    if(!picture) return res.status(400).json({
      msg: 'Size or format not supported.'
    })
  
    if(picture.size > 2000000) {
      return res.status(400).json({
        msg: 'Size or format not supported.'
      })
    }    
    next()
  }
  
}

module.exports = new Middleware()