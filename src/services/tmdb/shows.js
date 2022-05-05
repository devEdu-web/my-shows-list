require('dotenv').config();
const axios = require('axios').default;
const API_KEY = process.env.API_KEY;

class Show {
  #popularShowsUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
  #topRatedShowsUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`;
  #showDetailsUrl = `https://api.themoviedb.org/3/tv`;

  async getPopularShows() {
    try {
      const response = await axios.get(this.#popularShowsUrl);
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async getTopRatedShows() {
    try {
      const response = await axios.get(this.#topRatedShowsUrl);
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async getShowDetails(id) {
    try {
      const response = await axios.get(
        `${this.#showDetailsUrl}/${id}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return undefined;
    }
  }
}

module.exports = new Show();
