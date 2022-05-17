const Search = require('../../services/tmdb/search');
const Movie = require('../../services/tmdb/movies');
const Show = require('../../services/tmdb/shows');
const addProperty = require('../../utils/addProperty');

class searchController {
  async searchResult(req, res, next) {
    try {
      const { query } = req.query;
      const { userName } = req.session.user;
      const { profilePictureUrl } = req.session.user
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
        profilePictureUrl,
        userName,
        posterPathUrl: Movie.posterPathUrl,
        result: resultSorted,
      });
    } catch (error) {
      res.send(error);
    }
  }
  async getDetails(req, res, next) {
    const { id } = req.params;
    const { type } = req.query;
    const { userName } = req.sessions.user;
    const { profilePictureUrl } = req.session.user
    try {
      if (type == 'show') {
        const showDetails = await Show.getShowDetails(id);
        return res.render('details', {
          profilePictureUrl,
          userName,
          posterPathUrl: Movie.posterPathUrl,
          details: showDetails,
          type: 'show',
        });
      } else {
        // type == movie
        const movieDetails = await Movie.getMovieDetails(id);
        return res.render('details', {
          profilePictureUrl,
          userName,
          posterPathUrl: Movie.posterPathUrl,
          details: movieDetails,
          type: 'movie',
        });
      }
    } catch(error) {
      res.status(500).json({
        msg: error.message
      })
    }

  }
}

module.exports = new searchController();
