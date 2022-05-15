const Movie = require('../schemas/Movies')

async function doesUserHaveMovieInList(req, res, next) {
  const { id } = req.body;
  const { userId } = req.cookies;
  try {
    const movieExistsInUserList = await Movie.findOne({
      movieId: id,
      userId: userId,
    });
    if (movieExistsInUserList) return res.status(400).json({ msg: 'Item already on list.' });
    next()

  } catch(error) {
    res.status(500).json({
      msg: error.message
    })
  }
}

module.exports = {
  doesUserHaveMovieInList
}