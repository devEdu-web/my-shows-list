import dotenv from 'dotenv';
dotenv.config()

import http from 'http';
import dbConnect from './database/connection.js';
import db_url from './config/database.js';
import app from './app.js'

const server = http.createServer(app);

dbConnect(db_url)
    .then(() => {
        server.listen(process.env.PORT)
        console.log(db_url)
        console.log('Database ready and server listening')
    })
    .catch(error => {
        throw error
    })
