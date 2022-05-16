const Movie = require('../../services/tmdb/movies');
const Show = require('../../services/tmdb/shows');

async function getHomePage(req, res, next) {
  const { userName } = req.cookies
  const { profileUrl } = req.cookies
  const popularMovies = await Movie.getPopularMovies();
  const topRatedMovies = await Movie.getTopRatingMovies();
  const popularShows = await Show.getPopularShows();
  const topRatedShows = await Show.getTopRatedShows();

  res.render('home', {
    userName,
    profileUrl,
    posterPathUrl: Movie.posterPathUrl,
    popularMovies: popularMovies.results,
    topRatedMovies: topRatedMovies.results,
    popularShows: popularShows.results,
    topRatedShows: topRatedShows.results,
  });
}

module.exports = {
  getHomePage,
};
