require('dotenv').config({
  path: '../../../.env'
})
const nodemailer = require('nodemailer')
const ejs = require('ejs')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
})

async function send(receiver, link) {
  try {
    const data = await ejs.renderFile('./link.ejs', { link })
    const options = {
      from: process.env.GMAIL_EMAIL,
      to: receiver,
      subject: 'Cant believe it worked',
      html: data
    }
    await transporter.sendMail(options)
  } catch(error) {
    return error
  }

}

module.exports = send