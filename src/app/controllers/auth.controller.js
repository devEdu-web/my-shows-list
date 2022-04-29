const path = require('path')

function getRegisterPage(req, res, next) {
    res.render('register')
}

function getLoginPage(req, res, next) {
    res.render('login')
}

module.exports = {
    getRegisterPage,
    getLoginPage
}