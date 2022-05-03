const Show = require('../../src/services/tmdb/shows')
const showClass = new Show

describe('Shows', () => {
  it('should return popular shows', (done) => {
    showClass.getPopularShows()
      .then(shows => {
        const resultLength = shows.results.length
        expect(resultLength).toBeGreaterThan(0)
        done()
      })
      .catch(error => {
        if(error) return done(error)
        done()
      })
  })
  it('should return top rated shows', (done) => {
    showClass.getTopRatedShows()
      .then(shows => {
        const resultLength = shows.results.length
        expect(resultLength).toBeGreaterThan(0)
        done()
      })
      .catch(error => {
        if(error) return done(error)
        done()
      })
  })
});
