const path = require('path')
const User = require('../schemas/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

class Auth {
    getRegisterPage(req, res, next) {
        res.render('register')
    }

    getLoginPage(req, res, next) {
        res.render('login')
    }

    async saveUser(req, res, next) {
        const errors = validationResult(req)
        const {name, email, password} = req.body
        if(!errors.isEmpty()) return res.status(400).json(errors)
        
        try {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({
                    name, 
                    email,
                    password: encryptedPassword
                })
            return res.status(201).json(newUser)

        } catch(error) {
            return res.status(400).json(error)
        }
 

    }   
}


module.exports = new Auth()