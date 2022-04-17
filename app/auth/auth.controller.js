import path from 'path';
import {__dirname} from '../../app.js'

function getRegisterPage(req, res, next) {
    res.render('register')
}

function getLoginPage(req, res, next) {
    res.render('login')
}

export {
    getRegisterPage,
    getLoginPage
}