const mongoose = require('mongoose');
const { Schema } = mongoose;

const MoviesSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userScore: {
    type: Number,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
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

const Movie = mongoose.model('Movies', MoviesSchema);

module.exports = Movie;
