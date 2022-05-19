const Movie = require('../schemas/Movies');
const Show = require('../schemas/Shows');

async function doesUserHaveMovieInList(req, res, next) {
  const { id } = req.body;
  const { userId } = req.session.user;
  try {
    const movieExistsInUserList = await Movie.findOne({
      movieId: id,
      userId: userId,
    });
    if (movieExistsInUserList)
      return res.status(400).json({ msg: 'Item already on list.' });
    next();
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
}

async function doesUserHaveShowInList(req, res, next) {
  const { id } = req.body;
  const { userId } = req.session.user;
  try {
    const showExistsInUserList = await Show.findOne({
      showId: id,
      userId: userId,
    });
    if (showExistsInUserList)
      return res.status(400).json({ msg: 'Item already on list' });
    next();
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
}

module.exports = {
  doesUserHaveMovieInList,
  doesUserHaveShowInList,
};
