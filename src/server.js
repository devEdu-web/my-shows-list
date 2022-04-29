const dotenv = require('dotenv');
dotenv.config()

const http = require('http')
const database = require('./database/connection.js')
const db_url = require('./config/database.js')
const app = require('./app.js')

const server = http.createServer(app);

database
.dbConnect(db_url)
.then(() => {
            server.listen(process.env.PORT)
            console.log(db_url)
            console.log('Database ready and server listening')
        })
        .catch(error => {
            console.log(db_url)
            throw error
        })
