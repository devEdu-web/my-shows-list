const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongoServer = new MongoMemoryServer()

class Database {

    async dbConnect(url) {
        await mongoose.connect(url, {
            autoIndex: true
        });

        return mongoose.connection.readyState
    }

    async dbDisconnect(url) {
        await mongoose.disconnect()

        return mongoose.connection.readyState
    }

    async clearCollection() {
        await mongoose.connection.db.dropCollection('users')
    }
}

module.exports = new Database()