const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server')


class Database {
    dbConnect(url) {
        return mongoose.connect(url, {
            autoIndex: true
        });
    }

    async memoryDbConnect() {
        const mongod = await MongoMemoryServer.create()
        const url = mongod.getUri()
        await mongoose.connect(url)
    }

    async closeMemoryDb() {
        const mongod = await MongoMemoryServer.create()
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
        await mongod.stop()
    }

    async clearMemoryDb() {
        const collections = mongoose.connection.collections
    
        for(const key in collections) {
            const collection = collections[key]
            collection.drop((error, result) => {
                if(error) console.log(error)
            })
        }
    }
}

module.exports = new Database()