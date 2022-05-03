require('dotenv').config()
const axios = require('axios').default;
const qs = require('querystring');
const API_KEY = process.env.API_KEY

class Movie {
  #popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=3`

  async getPopularMovies() {
    const response = await axios.get(this.#popularMoviesUrl)
    return response.data
    
  }
}

module.exports = Movie