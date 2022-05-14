require('dotenv').config();
const database = require('../../src/database/connection.js');
const { faker } = require('@faker-js/faker');
const request = require('supertest');
const app = require('../../src/app');

beforeAll(async () => {
  await database.dbConnect(process.env.TEST_DB_URL);
});

afterAll(async () => {
  await database.dbDisconnect();
});

describe('Authentication', () => {
  it('should save a user with valid credentials', (done) => {
    const mockUser = {
      name: 'eduardo',
      email: faker.internet.email(),
      password: 'eduardo',
      confirmPassword: 'eduardo',
    };

    try {
      request(app)
        .post('/auth/register')
        .send(mockUser)
        .expect(201)
        .end(async (error, response) => {
          if (error) return done(error);
          return done();
        });
    } catch (error) {
      throw error;
    }
  });

  it('should return an error when saving user with existing email', (done) => {
    const mockUser = {
      name: 'eduardo',
      email: 'dudu@gmail.com',
      password: 'eduardo',
      confirmPassword: 'eduardo',
    };

    try {
      request(app)
        .post('/auth/register')
        .send(mockUser)
        .expect(400)
        .end(async (error, response) => {
          if (error) return done(error);
          return done();
        });
    } catch (error) {
      throw error;
    }
  });

  it('should log user with valid credentials and receive an JWT token', async () => {
    const mockUser = {
      email: 'dudu@gmail.com',
      password: 'eduardo',
    };

    const response = await request(app).post('/auth/login').send(mockUser);
    expect(response.status).toBe(200);
    expect(response.header['set-cookie'].length).toBeGreaterThan(1);
  });

  it('should not be able to access protected routes', async () => {
    const home = await request(app).get('/home');
    const search = await request(app).get('/search');
    const searchDetails = await request(app).get('/search/details/278');
    const moviesList = await request(app).get('/user/list/movies');
    const showsList = await request(app).get('/user/list/shows');
    const settings = await request(app).get('/user/settings');
    expect(home.status).toBe(302);
    expect(search.status).toBe(302);
    expect(searchDetails.status).toBe(302);
    expect(moviesList.status).toBe(302);
    expect(showsList.status).toBe(302);
    expect(settings.status).toBe(302);
  })

  it('should be able to access only unauthenticated', async () => {
    const registerMockUser = {
      name: 'eduardo',
      email: 'mockregisteruser@gmail.com',
      password: 'eduardo',
      confirmPassword: 'eduardo',
    }
    const loginMockUser = {
      email: 'mockloginuser@gmail.com',
      password: 'mockpassword'
    }

    const getLoginPage = await request(app).get('/auth/login');
    const getRegisterPage = await request(app).get('/auth/register');
    const getIndexPage = await request(app).get('/');
    const postLogin = await request(app).post('/auth/login').send(loginMockUser);
    const postRegister = await request(app).post('/auth/register').send(registerMockUser);

    expect(getLoginPage.status).not.toBe(302);
    expect(getRegisterPage.status).not.toBe(302);
    expect(getIndexPage.status).not.toBe(302);
    expect(postLogin.status).not.toBe(302);
    expect(postRegister.status).not.toBe(302);

  })  

});
