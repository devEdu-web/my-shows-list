const { body } = require('express-validator');

class Validator {
  constructor() {
    this.registerValidation = [
      body('name')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long.'),

      body('email')
        .isEmail()
        .withMessage('Invalid email'),

      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must at least 6 characters long.'),

      body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error('Passwords does not match.');
            }
            return true;
      }),
    ];
    this.updatePasswordValidation = [
      body('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must at least 6 characters long.'),
    ]
    this.updateEmailValidation = [
      body('newEmail')
        .isEmail()
        .withMessage('Invalid email.')
    ]
  }
}

module.exports = new Validator();
