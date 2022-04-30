const database =  require('../../src/database/connection.js');
const bcrypt = require('bcrypt');
const request = require('supertest')
const app = require('../../src/app')
// const { saveUser } = require('../../src/app/controllers/auth.controller')

beforeAll(async () => {await database.memoryDbConnect()})
// beforeEach(async () => {await database.clearMemoryDb()})
afterAll(async () => {await database.closeMemoryDb()})

describe('Authentication', () => {


    it('should save user with valid credentials', (done) => {
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

});
