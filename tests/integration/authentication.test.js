require('dotenv').config()
const database = require('../../src/database/connection.js');
const { faker } = require('@faker-js/faker')
const request = require('supertest');
const app = require('../../src/app');
// const { db } = require('../../src/app/schemas/User.js');

beforeAll(async () => {
  await database.dbConnect(process.env.TEST_DB_URL)
})

afterAll(async () => {
  // await database.clearCollection()
  await database.dbDisconnect()
})

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
      throw error
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
        throw error
    }
  });

  it('should log user with valid credentials and receive an JWT token', async () => {
    const mockUser = {
      email: 'dudu@gmail.com',
      password: 'eduardo',
    };


    const response = 
      await request(app)
        .post('/auth/login')
        .send(mockUser)
    // console.log(response.header['set-cookie'])
    expect(response.status).toBe(302)
    expect(response.header['set-cookie'].length).toEqual(1)
  })


});
