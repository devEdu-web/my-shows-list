const mongoose = require("mongoose");
class Database {

    async dbConnect(url) {
        console.log(url)
        await mongoose.connect(url, {
            autoIndex: true
        });

        return mongoose.connection.readyState
    }

    async dbDisconnect(url) {
        await mongoose.disconnect()

        return mongoose.connection.readyState
    }

}

module.exports = new Database()