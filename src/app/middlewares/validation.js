const { body } = require('express-validator')

class Validator {
    constructor() {
        this.registerValidation = [
            body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
            body('email').isEmail().withMessage('Invalid email'),
            body('password').isLength({ min: 6 }).withMessage('Password must at least 5 characters long.'),
            body('confirmPassword').custom((value, { req }) => {
                if(value !== req.body.password) {
                    throw new Error('Passwords does not match.')
                }

                return true
            })
        ]

        this.loginValidation = [
            body('email').isEmail()
        ]
    }
}

module.exports = new Validator()