require('dotenv').config()
const axios = require('axios').default;
const qs = require('querystring');
const API_KEY = process.env.API_KEY

class Movie {
  #popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  #topRatingMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
  #movieDetailsUrl = `https://api.themoviedb.org/3/movie`
  async getPopularMovies() {
    const response = await axios.get(this.#popularMoviesUrl)
    return response.data
    
  }

  async getTopRatingMovies() {
    const response = await axios.get(this.#topRatingMoviesUrl)
    return response.data
  }

  async getMovieDetails(id) {
    const response = await axios.get(`${this.#movieDetailsUrl}/${id}?api_key=${API_KEY}`)
    return response.data

  }

}

module.exports = Movie