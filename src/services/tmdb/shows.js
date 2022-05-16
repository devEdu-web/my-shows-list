require('dotenv').config();
const axios = require('axios').default;
const API_KEY = process.env.API_KEY;
const Tmdb = require('./Tmdb')

class Show extends Tmdb {
  async getPopularShows() {
    try {
      const response = await axios.get(this.popularShowsUrl);
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async getTopRatedShows() {
    try {
      const response = await axios.get(this.topRatedShowsUrl);
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async getShowDetails(id) {
    try {
      const response = await axios.get(
        `${this.showDetailsUrl}/${id}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return undefined;
    }
  }
}

module.exports = new Show();
