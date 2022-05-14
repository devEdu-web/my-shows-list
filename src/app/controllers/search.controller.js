const Search = require('../../services/tmdb/search');
const Movie = require('../../services/tmdb/movies');
const Show = require('../../services/tmdb/shows');
const addProperty = require('../../utils/addProperty');
const posterPathUrl = 'https://image.tmdb.org/t/p/original/';

class searchController {
  async searchResult(req, res, next) {
    try {
      const { query } = req.query;
      const { userName } = req.cookies;
      const showsResult = await Search.searchShow(query);
      const moviesResult = await Search.searchMovie(query);

      const showsResultWithType = addProperty(
        showsResult.results,
        'type',
        'show'
      );
      const moviesResultWithType = addProperty(
        moviesResult.results,
        'type',
        'movie'
      );

      const result = showsResultWithType.concat(moviesResultWithType);
      const resultSorted = result.sort((a, b) => {
        if (a.popularity > b.popularity) return -1;
      });

      res.render('searchResult', {
        userName,
        posterPathUrl,
        result: resultSorted,
      });
    } catch (error) {
      res.send(error);
    }
  }
  async getDetails(req, res, next) {
    const { id } = req.params;
    const { type } = req.query;
    const { userName } = req.cookies;
    // TODO put this inside a try / catch
    if (type == 'show') {
      const showDetails = await Show.getShowDetails(id);
      return res.render('details', {
        userName,
        posterPathUrl,
        details: showDetails,
        type: 'show',
      });
    } else {
      // type == movie
      const movieDetails = await Movie.getMovieDetails(id);
      return res.render('details', {
        userName,
        posterPathUrl,
        details: movieDetails,
        type: 'movie',
      });
    }
  }
}

module.exports = new searchController();
