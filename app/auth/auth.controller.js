import path from 'path';
import {__dirname} from '../../app.js'

function getRegisterPage(req, res, next) {
    res.render('register')
}


export {
    getRegisterPage
}