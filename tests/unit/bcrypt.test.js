const database =  require('../../src/database/connection.js');
const bcrypt = require('bcrypt');
const User =  require('../../src/app/schemas/User.js')

beforeAll(async () => {
    await database.memoryDbConnect()
    
})

beforeEach(async () => {
    await database.clearMemoryDb()

})

afterAll(async () => {
    await database.closeMemoryDb()
    
})

it('should encrypt password', async () => {
    const mockUser = new User({
        name: 'Eduardo',
        email: 'eduardo@gmail.com',
        password: await bcrypt.hash('eduardo', 10)
    })
    await mockUser.save()

    const user = await User.find({})
    const passwordEncrypted = bcrypt.compareSync('eduardo', user[0].password)
    expect(passwordEncrypted).toBe(true)
})
