const Movie = require('../../services/tmdb/movies');
const Show = require('../../services/tmdb/shows');
const Cache = require('../schemas/Cache')
const threeDays = 1000 * 60 * 60 * 72;


async function getHomePage(req, res, next) {
  const { userName } = req.session.user
  const { profilePictureUrl } = req.session.user

  try {
    const cachedData = await Cache.find({})

    if(cachedData.length <= 0) {
      const popularMovies = await Movie.getPopularMovies();
      const topRatedMovies = await Movie.getTopRatingMovies();
      const popularShows = await Show.getPopularShows();
      const topRatedShows = await Show.getTopRatedShows();

      const newCache = new Cache({
        expire: Date.now() + threeDays,
        topRatedMovies: topRatedMovies.results,
        popularMovies: popularMovies.results,
        topRatedShows: topRatedShows.results,
        popularShows: popularShows.results
      })

      await newCache.save()
      return res.render('home', {
        userName,
        profilePictureUrl,
        posterPathUrl: Movie.posterPathUrl,
        popularMovies: popularMovies.results,
        topRatedMovies: topRatedMovies.results,
        popularShows: popularShows.results,
        topRatedShows: topRatedShows.results,
      });

    } else {
      return res.render('home', {
        userName,
        profilePictureUrl,
        posterPathUrl: Movie.posterPathUrl,
        popularMovies: cachedData[0].popularMovies,
        topRatedMovies: cachedData[0].topRatedMovies,
        popularShows: cachedData[0].popularShows,
        topRatedShows: cachedData[0].topRatedShows,
      });
    }
  } catch(error) {
    return res.status(500).json({
      msg: error.message
    })
  }

}

module.exports = {
  getHomePage,
};
