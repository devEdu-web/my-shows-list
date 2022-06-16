const mailConfig = require('../../config/mail')
const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

const transporter = nodemailer.createTransport({
  service: mailConfig.service,
  auth: {
    user: mailConfig.auth.user,
    pass: mailConfig.auth.pass
  }
})

async function send(receiver, token) {
  const link = `${mailConfig.baseUrl}/${token}`
  try {
    const data = await ejs.renderFile(path.join(__dirname, 'link.ejs'), { link })
    const options = {
      from: mailConfig.auth.user,
      to: receiver,
      subject: 'Confirmation link.',
      html: data
    }
    await transporter.sendMail(options)
  } catch(error) {
    return error
  }

}

module.exports.send = send