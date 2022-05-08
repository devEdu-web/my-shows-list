const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShowsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userScore: {
    type: Number,
    required: true,
  },
  showId: {
    type: String,
    required: true,
    unique: false,
  },
  showTitle: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  voteCount: {
    type: Number,
    required: true,
  },
  genresId: {
    type: [Number],
  },
});

const Show = mongoose.model('Shows', ShowsSchema);

module.exports = Show;
