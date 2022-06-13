const { Schema } = require('mongoose');
const mongoose = require('mongoose')
// const expirationTime = 1000 * 60 * 60 * 24;
const expirationTime = 1000 * 60;

const ConfirmationTokenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    default: Date.now(),
    index: {
      expires: expirationTime
    }
  }
})

module.exports = mongoose.model('ExpirationTokens', ConfirmationTokenSchema)