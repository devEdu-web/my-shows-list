const path = require('path');
const User = require('../schemas/User');
const GoogleOAuth = require('../../services/google/Google');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

class Auth {
  getRegisterPage(req, res, next) {
    return res.render('register');
  }

  getLoginPage(req, res, next) {
    return res.render('login');
  }

  getGoogleConsentScreen(req, res, next) {
    const consentScreenUrl = GoogleOAuth.getConsentScreenUrl();
    return res.redirect(307, consentScreenUrl);
  }

  async googleCallbackHandler(req, res, next) {
    const { code } = req.query;
    const { access_token, id_token } = await GoogleOAuth.getTokens(code);
    try {
      const user = await GoogleOAuth.getUser(access_token, id_token);

      // TODO: When you add the verify email functionality, do not save user without making sure his email is verified

      const newUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          email: user.email,
          name: user.given_name,
          profilePictureUrl: user.picture,
        },
        {
          upsert: true,
          new: true,
        }
      );

      req.session.user = {
        userId: newUser._id.toString(),
        userName: newUser.name,
        profilePictureUrl: newUser.profilePictureUrl,
      };

      return res.redirect('/home');
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  async saveUser(req, res, next) {
    const errors = validationResult(req);
    const { name, email, password } = req.body;
    if (!errors.isEmpty()) return res.status(400).json(errors);

    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
      });
      res.location('/auth/login');
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ msg: 'Email already exists.' });
    }
  }

  async logUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'Email or password invalid.' });
      const doesPasswordsMatch = await bcrypt.compare(password, user.password);

      if (!user || !doesPasswordsMatch)
        return res.status(400).json({ msg: 'Email or password invalid.' });

      req.session.user = {
        userId: user._id.toString(),
        userName: user.name,
        profilePictureUrl: user.profilePictureUrl,
      };

      res.location('/home');
      return res.status(200).json({
        msg: 'User logged.',
      });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  async logout(req, res, next) {
    try {
      await req.session.destroy();
      res.redirect('/auth/login');
    } catch(error) {
      return res.status(500).json({
        msg: error.message
      })
    }
  }
}

module.exports = new Auth();
