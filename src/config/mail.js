const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env')
})

let baseUrl;

if(process.env.NODE_ENV == 'production') {
  baseUrl = process.env.CONFIRMATION_BASE_PROD_URL
} else {
  baseUrl = process.env.CONFIRMATION_BASE_DEV_URL
}


module.exports = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  },
  baseUrl
}