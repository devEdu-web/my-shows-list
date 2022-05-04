require('dotenv').config()
const axios = require('axios').default;
const API_KEY = process.env.API_KEY

class Search {
  #getShowDetailsUrl = `https://api.themoviedb.org/3/tv`
  async getDetails(id) {
    const tryFetchShow = await axios.get(`${this.#getShowDetailsUrl}/${id}?api_key=${API_KEY}`)



    return tryFetchShow.data

  }
}

module.exports = Search