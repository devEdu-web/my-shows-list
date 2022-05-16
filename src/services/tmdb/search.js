require('dotenv').config()
const axios = require('axios').default;
const qs = require('querystring')
const Tmdb = require('./Tmdb')
const API_KEY = process.env.API_KEY

class Search extends Tmdb {
  async searchMovie(query) {
    try {
      const queryParameter = {
        query
      }
      const response = await axios.get(`${this.searchBaseUrl}/movie?api_key=${API_KEY}&${qs.stringify(queryParameter)}`)
      return response.data
    } catch(error) {
      return undefined
    }
  }

  async searchShow(query) {
    const queryParameter = {
      query
    }
    try {
      const response = await axios.get(`${this.searchBaseUrl}/tv?api_key=${API_KEY}&${qs.stringify(queryParameter)}`)
      return response.data
    } catch(error) {
      return error
    }
    
  }

}

module.exports = new Search()