require('dotenv').config()
const axios = require('axios').default;
const API_KEY = process.env.API_KEY

class Show {
  #popularShowsUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
  #topRatedShowsUrl = `moviedb.org/3/tv/top_rated?api_key=${API_KEY}`

  async getPopularShows() {
    const response = await axios.get(this.#popularShowsUrl);
    return response.data
  }

}

module.exports = Show