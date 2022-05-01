const database = require('../../src/database/connection')
require('dotenv').config()

afterEach(async () => {
  await database.dbDisconnect()
})

it('should connect to test database', async () => {
  const isConnected = await database.dbConnect(process.env.TEST_DB_URL)
  expect(isConnected).toBe(1)
})

it('should disconnect to test database', async () => {
  const isConnected = await database.dbDisconnect()
  expect(isConnected).toBe(0)
})