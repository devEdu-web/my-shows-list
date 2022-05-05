const Search = require('../../services/tmdb/search')
const posterPathUrl = 'https://image.tmdb.org/t/p/original/';

class searchController {
    async searchResult(req, res, next) {
        try {
            const {query} = req.query
            const showsResult = await Search.searchShow(query);
            const moviesResult = await Search.searchMovie(query);
            const result = showsResult.results.concat(moviesResult.results)
            const resultSorted = result.sort((a, b) => {
                if(a.popularity > b.popularity) return -1
            })

            res.render('searchResult', {
                posterPathUrl,
                result: resultSorted
            })
        } catch(error) {
            res.send(error)
        }
    }
}



module.exports = new searchController()