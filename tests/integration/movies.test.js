const Movie = require('../../src/services/tmdb/movies')
const movieClass = new Movie()


describe('Movies', () => {
  it('should return popular movies', (done) => {
    movieClass.getPopularMovies()
      .then(movies => {
        const resultLength = movies.results.length
        expect(resultLength).toBeGreaterThan(0)
        done()
      })
      .catch(error => {
        if(error) return done(error)
        done(error)
      })
      done()
  })

  it('should return top rated movies', (done) => {
    movieClass.getTopRatingMovies()
    .then(movies => {
      const resultLength = movies.results.length
      expect(resultLength).toBeGreaterThan(0)
      done()
    })
    .catch(error => {
      if(error) return done(error)
      done()
    })
  })

  it('should return a movie details', (done) => {
    movieClass.getMovieDetails(335787)
      .then(details => {
        console.log(details)
        expect(typeof details).toBe("object")
        done()
      })
      .catch(error => {
        if(error) return done(error)
        done()
      })
  })
});




