require('dotenv').config();
const API_KEY = process.env.API_KEY;

class Tmdb {
  constructor() {
    this.searchBaseUrl = `https://api.themoviedb.org/3/search`;

    this.posterPathUrl = 'https://image.tmdb.org/t/p/original/';

    this.popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    this.topRatingMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
    this.movieDetailsUrl = `https://api.themoviedb.org/3/movie`;

    this.popularShowsUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
    this.topRatedShowsUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`;
    this.showDetailsUrl = `https://api.themoviedb.org/3/tv`;
  }
}

module.exports = Tmdb;
