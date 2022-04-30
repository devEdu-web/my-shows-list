const database =  require('../../src/database/connection.js');
const bcrypt = require('bcrypt');
const request = require('supertest')
const app = require('../../src/app')

beforeAll(async () => {await database.memoryDbConnect()})
// beforeEach(async () => {await database.clearMemoryDb()})
afterAll(async () => {await database.closeMemoryDb()})

describe('Authentication', () => {
    it('should save a user with valid credentials', (done) => {
        const mockUser = {
            name: "eduardo",
            email: "dudu@gmail.com",
            password: "eduardo",
            confirmPassword: "eduardo"
        }

        try {
            request(app)
            .post('/auth/register')
            .send(mockUser)
            .expect(201)
            .end(async (error, response) => {
                if(error) return done(error)
                return done()
            })
        } catch(error) {
            expect(error).toMatch('error')
        }
    })

    it('should return an error when saving user with existing email', (done) => {
        const mockUser = {
            name: "eduardo",
            email: "dudu@gmail.com",
            password: "eduardo",
            confirmPassword: "eduardo"
        }

        try {
            request(app)
            .post('/auth/register')
            .send(mockUser)
            .expect(400)
            .end(async (error, response) => {
                if(error) return done(error)
                return done()
            })
        } catch(error) {

        }
    })

});
