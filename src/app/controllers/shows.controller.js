const Show = require('../../services/tmdb/shows');
const posterPathUrl = 'https://image.tmdb.org/t/p/original/';
class showsController {
  async showDetailsHandler(req, res, next) {
    const { id } = req.params;
    const { userName } = req.cookies
    try {
      const showDetails = await Show.getShowDetails(id);
      res.render('details', {
        userName,
        posterPathUrl,
        details: showDetails,
      });
    } catch (error) {
      res.send('not found');
    }
  }
}

module.exports = new showsController();
