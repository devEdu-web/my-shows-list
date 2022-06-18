const User = require('../schemas/User');
const GoogleOAuth = require('../../services/google/Google');
const ConfirmationToken = require('../schemas/ConfirmationToken');
const ResetToken = require('../schemas/resetToken');

const crypto = require('crypto');
const bcrypt = require('bcrypt');

const mail = require('../../services/mail/index');
const { validationResult } = require('express-validator');

class Auth {
  getRegisterPage(req, res, next) {
    return res.render('auth/register');
  }

  getLoginPage(req, res, next) {
    return res.render('auth/login');
  }

  getConfirmationPage(req, res, next) {
    return res.render('auth/confirmation');
  }

  getResetPasswordRequestPage(req, res, next) {
    return res.render('auth/resetPasswordLink');
  }

  getResetPageConfirmation(req, res, next) {
    return res.render('auth/reset');
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
          isVerified: true,
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

      const token = new ConfirmationToken({
        userId: newUser._id,
        token: crypto.randomBytes(32).toString('hex'),
      });

      await token.save();
      await mail.sendConfirmationLink(newUser.email, token.token);

      res.location('/auth/confirm');
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
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  }

  async confirmationCallbackHandler(req, res, next) {
    const token = req.params.token;
    try {
      const userToken = await ConfirmationToken.findOne({ token });
      await User.updateOne({ _id: userToken.userId }, { isVerified: true });
      await ConfirmationToken.deleteOne({ _id: userToken._id });
      res.redirect('/auth/login');
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async sendResetLinkPassword(req, res, next) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User not found.' });

      const newToken = await ResetToken.findOneAndUpdate(
        { userId: user._id.toString() },
        {
          userId: user._id.toString(),
          token: crypto.randomBytes(32).toString('hex'),
        },
        {
          upsert: true.valueOf,
          new: true,
        }
      );
      await mail.sendResetPasswordLink(user.email, newToken.token);

      res.location('/auth/resetPage');
      return res.status(201).json({
        msg: 'Email sent',
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  async resetPasswordRedirectHandler(req, res, next) {
    const { token } = req.params;
    try {
      const findToken = await ResetToken.findOne({ token });
      if (!findToken) return res.status(400).json({ msg: 'User not found.' });
      return res.render('auth/resetPasswordForm', {
        userId: findToken.userId,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  async resetPasswordController(req, res, next) {
    const { newPassword, userId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    try {
      const passwordEncrypted = await bcrypt.hash(newPassword, 10);
      await User.updateOne(
        { _id: userId },
        { password: passwordEncrypted }
      );

      res.location('/auth/login');
      return res.status(201).json({
        msg: 'Password updated.',
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

module.exports = new Auth();
