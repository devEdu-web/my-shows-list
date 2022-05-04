const Show = require('../../services/tmdb/shows')
const posterPathUrl = 'https://image.tmdb.org/t/p/original/'
class showsController {
  async showDetailsHandler(req, res, next) {
    const {id} = req.params
    try {
      const showDetails = await Show.getShowDetails(id)
      console.log(showDetails)
      res.render('details', {
        posterPathUrl,
        details: showDetails
      })
    } catch(error) {
      res.send('not found')
    }
  }
}

module.exports = new showsController()