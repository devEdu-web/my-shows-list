const Search = require('../../services/tmdb/search');
const Movie = require('../../services/tmdb/movies');
const Show = require('../../services/tmdb/shows');
const userMovies = require('../schemas/Movies')
const userShows = require('../schemas/Shows')
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

      return res.render('search/searchResult', {
        profilePictureUrl,
        userName,
        posterPathUrl: Movie.posterPathUrl,
        result: resultSorted,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message
      })
    }
  }
  async getDetails(req, res, next) {
    const { userId } = req.session.user
    const { id } = req.params;
    const { type } = req.query;
    const { userName } = req.session.user;
    const { profilePictureUrl } = req.session.user
    try {
      if (type == 'show') {
        const showDetails = await Show.getShowDetails(id);
        const showCast = await Show.getCast(id)
        const recommendations = await Show.getRecommendations(id)
        const isShowOnUserList = await userShows.findOne(
          {
            userId: userId,
            showId: id
          }
        )
        
        return res.render('search/details', {
          profilePictureUrl,
          userName,
          posterPathUrl: Movie.posterPathUrl,
          details: showDetails,
          type: 'show',
          cast: showCast.cast,
          recommendations: recommendations.results,
          isOnUserList: isShowOnUserList
        });
      } else {
        // type == movie
        const movieDetails = await Movie.getMovieDetails(id);
        const movieCast = await Movie.getCast(id)
        const recommendations = await Movie.getRecommendations(id)
        const isMovieOnUserList = await userMovies.findOne(
          {
            userId: userId,
            movieId: id
          }
        )
        return res.render('search/details', {
          profilePictureUrl,
          userName,
          posterPathUrl: Movie.posterPathUrl,
          details: movieDetails,
          type: 'movie',
          cast: movieCast.cast,
          recommendations: recommendations.results,
          isOnUserList: isMovieOnUserList
        });
      }
    } catch(error) {
      return res.status(500).json({
        msg: error.message
      })
    }

  }
}

module.exports = new searchController();
