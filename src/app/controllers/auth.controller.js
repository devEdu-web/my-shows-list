const path = require('path');
const User = require('../schemas/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

class Auth {
  getRegisterPage(req, res, next) {
    res.render('register');
  }

  getLoginPage(req, res, next) {
    res.render('login');
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

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );

      res.cookie('token', token);
      res.cookie('userId', user._id.toString());
      res.cookie('userName', user.name)

      res.location('/home')
      res.status(200).json({
        msg: 'User logged.'
      })

    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  async logout(req, res, next) {
    res.cookie('token', '');
    res.redirect('/auth/login');
  }
}

module.exports = new Auth();
