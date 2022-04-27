import mongoose from "mongoose";

function dbConnect(url) {
    return mongoose.connect(url, {
        autoIndex: true
    });
}

export default dbConnect