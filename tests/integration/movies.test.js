const movie = require('../../src/services/tmdb/movies')
const Movie = new movie()

it('should return popular movies', (done) => {
  Movie.getPopularMovies()
    .then(movies => {
      const resultLength = Object.entries(movies.results).length
      expect(resultLength).toBeGreaterThan(0)
      done()
    })
    .catch(error => {
      if(error) return done(error)
      done(error)
    })
    done()
})