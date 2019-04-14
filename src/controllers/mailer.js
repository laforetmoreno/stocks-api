const nodemailer = require("nodemailer");

const {
  MAILER_HOST,
  MAILER_PORT,
  MAILER_AUTH_USER,
  MAILER_AUTH_PASS
} = process.env;

const transporter = nodemailer.createTransport({
  host: MAILER_HOST,
  port: MAILER_PORT,
  auth: {
    user: MAILER_AUTH_USER,
    pass: MAILER_AUTH_PASS
  }
});

const mailOptions = (to, email, name, message, subject) => ({
  from: "Formulário de contato pedrolaforet.com",
  to: to,
  subject: subject,
  html: `
    Olá Pedro! <br><br> 
    ${name} - ${email} acaba de te enviar uma mensagem via www.pedrolaforet.com <br><br> 
    Mensagem:<br><br> ${message}`
});

module.exports = { transporter, mailOptions };
