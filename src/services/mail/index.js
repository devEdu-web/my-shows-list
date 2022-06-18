const mailConfig = require('../../config/mail');
const resetPasswordConfig = require('../../config/resetPassword');
const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: mailConfig.service,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass,
      },
    });
  }

  async sendConfirmationLink(receiver, token) {
    const link = `${mailConfig.baseUrl}/${token}`;
    try {
      const data = await ejs.renderFile(
        path.join(__dirname, 'templates', 'link.ejs'),
        { link }
      );
      const options = {
        from: mailConfig.auth.user,
        to: receiver,
        subject: 'Confirmation link.',
        html: data,
      };
      await this.transporter.sendMail(options);
    } catch (error) {
      return error;
    }
  }

  async sendResetPasswordLink(receiver, token) {
    const link = `${resetPasswordConfig.resetCallbackUrl}/${token}`;
    try {
      const data = await ejs.renderFile(
        path.join(__dirname, 'templates', 'link.ejs'),
        { link }
      );
      const options = {
        from: mailConfig.auth.user,
        to: receiver,
        subject: 'Change password request.',
        html: data,
      };
      await this.transporter.sendMail(options);
    } catch (error) {
      return error;
    }
  }
}

module.exports = new Mail();
