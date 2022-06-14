const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env')
})

module.exports = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
}