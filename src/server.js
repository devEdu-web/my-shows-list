const dotenv = require('dotenv');
dotenv.config()

const http = require('http')
const database = require('./database/connection.js')
const db_url = require('./config/database.js')
const app = require('./app.js')
console.log(db_url)
const server = http.createServer(app);

async function start() {
    console.log(db_url)
    await database.dbConnect(db_url)
    server.listen(process.env.PORT)
    console.log('Database ready and server listening')
}

start()
