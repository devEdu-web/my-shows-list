const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePictureUrl: {
        type: String,
        required: true,
        default: 'undefined',
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
})

const User = mongoose.model('User', UserSchema)
module.exports = User