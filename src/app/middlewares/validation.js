const { body } = require('express-validator')

class Validator {
    constructor() {
        this.registerValidation = [
            body('name').isLength({ min: 3 }),
            body('email').isEmail(),
            body('password').isLength({ min: 6 }),
            body('confirmPassword').custom((value, { req }) => {
                if(value !== req.body.password) {
                    throw new Error('Passwords does not match.')
                }

                return true
            })
        ]
    }
}

module.exports = new Validator()