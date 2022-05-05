require('dotenv').config()
const axios = require('axios').default;
const API_KEY = process.env.API_KEY

class Search {
  #searchBaseUrl = `https://api.themoviedb.org/3/search`

  async searchMovie(query) {
    try {
      const response = await axios.get(`${this.#searchBaseUrl}/movie?api_key=${API_KEY}&query=${query}`)
      return response.data
    } catch(error) {
      return undefined
    }
  }

}

module.exports = new Search()