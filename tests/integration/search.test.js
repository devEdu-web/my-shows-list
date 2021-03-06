const Search = require('../../src/services/tmdb/search');

describe('Search', () => {
  it('should return an array of movies using a query', (done) => {
    Search.searchMovie('the vampire diaries')
      .then((result) => {
        expect(result.results.length).toBeGreaterThan(0);
        done();
      })
      .catch((error) => {
        if (error) return done(error);
        done();
      });
  });
  it('should return an empty array of movies using an inexistent query', (done) => {
    Search.searchMovie('thisisnotavalidqueryforashowsoitwontwork')
      .then((result) => {
        expect(result.results.length).toBe(0);
        done();
      })
      .catch((error) => {
        if (error) return done(error);
        done();
      });
  });
  it('should return an array of shows using a query', (done) => {
    Search.searchShow('dexter')
      .then((result) => {
        expect(result.results.length).toBeGreaterThan(0);
        done();
      })
      .catch((error) => {
        if (error) return done(error);
        done();
      });
  });
  it('should return an empty array of shows using an inexistent query', (done) => {
    Search.searchShow('thisisnotavalidqueryforashowsoitwontwork')
      .then((result) => {
        expect(result.results.length).toBe(0);
        done();
      })
      .catch((error) => {
        if (error) return done(error);
        done();
      });
  });
});
