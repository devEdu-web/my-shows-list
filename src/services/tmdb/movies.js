require('dotenv').config();
const axios = require('axios').default;
const Tmdb = require('./Tmdb')
const API_KEY = process.env.API_KEY;

class Movie  extends Tmdb {
  async getPopularMovies() {
    try {
      const response = await axios.get(this.popularMoviesUrl);
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async getTopRatingMovies() {
    try {
      const response = await axios.get(this.topRatingMoviesUrl);
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async getMovieDetails(id) {
    try {
      const response = await axios.get(
        `${this.movieDetailsUrl}/${id}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return undefined;
    }
  }
  async getCast(id) {
    try {
      const response = await axios.get(`${this.movieDetailsUrl}/${id}/credits?api_key=${API_KEY}`)
      return response.data
    } catch(error) {
      return undefined
    }
  }
}

module.exports = new Movie();
