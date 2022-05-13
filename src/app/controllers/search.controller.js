const Search = require('../../services/tmdb/search')
const Movie = require('../../services/tmdb/movies')
const Show = require('../../services/tmdb/shows')
const posterPathUrl = 'https://image.tmdb.org/t/p/original/';

class searchController {
    async searchResult(req, res, next) {
        try {
            const {query} = req.query
            const showsResult = await Search.searchShow(query);
            const moviesResult = await Search.searchMovie(query);

            // Aqui tut a adicionando um tipo nos filmes e series pra poder peagar os detalhes na hora da busca
            // por enquando tá tudo certo mas faz mais uns testes ai pra ter certeza

            for(let i = 0; i < showsResult.results.length; i++) {
                Object.defineProperty(showsResult.results[i], 'type', {
                    value: 'show'
                })
            }

            for(let i = 0; i < moviesResult.results.length; i++) {
                Object.defineProperty(moviesResult.results[i], 'type', {
                    value: 'movie'
                })
            }

            
            const result = showsResult.results.concat(moviesResult.results)
            const resultSorted = result.sort((a, b) => {
                if(a.popularity > b.popularity) return -1
            })

            // console.log(resultSorted[0].type)

            res.render('searchResult', {
                posterPathUrl,
                result: resultSorted
            })
        } catch(error) {
            res.send(error)
        }
    }
    async getDetails(req, res, next) {
        const { id } = req.params
        const { type } = req.query

        if(type == 'show') {
            const showDetails = await Show.getShowDetails(id)
            return res.render('details', {
                posterPathUrl,
                details: showDetails,
                type: 'show'
            })
        } else {
            // type == movie
            const movieDetails = await Movie.getMovieDetails(id)
            return res.render('details', {
                posterPathUrl,
                details: movieDetails,
                type: 'movie'

            })
        }

    }
}



module.exports = new searchController()