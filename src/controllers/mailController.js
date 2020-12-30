import emailService from '../services/emailService';
// import emailErrorService from '../services/email_error_service';
import mailer from '../services/mailer';
import Email from '../models/emailModel';
// import EmailError from '../model/email_error_schema';
import resultSender from '../services/rabbitMQService';
import Response from '../helpers/response';

const response = new Response();

const log = require('pino')({ prettyPrint: true });
const mailerConfig = require('../config/mailerConfig')();

const sendMail = (mail, isFromRabbitMq) => {
  mail = setEmailFrom(mail);
  mailer.sendMail(mail).then((info) => {
    log.debug('[Mail controller] Email has been sent.');
    const email = new Email(mail);
    if (isFromRabbitMq) {
      resultSender.sendPositiveResult(JSON.stringify(mail));
    }
  //   emailService.createOne(email)
  //     .then((info) => { }/* log.info(JSON.stringify(info)) */)
  //     .catch((err) => log.error(`[Mail controller] Error saving mail to DB: ${JSON.stringify(err)}`));
  // }).catch((error) => {
  //   log.error(`[Mail controller] Error sending mail: ${JSON.stringify(error)}`);
  //   const emailError = response.setError(error.code, error.name, error.message);
  //   console.log(error, 'ght')
    // const emailError = new EmailError({
    //   code: error.code,
    //   command: error.command,
    //   type: error.name,
    //   msg: error.message,
    //   request_body: mail,
    // });
    // if (isFromRabbitMq) {
    //   resultSender.sendNegativeResult(JSON.stringify(emailError));
    // }
    //return response.send(emailError);
    // emailErrorService.createOne(emailError)
    //   .then((info) => { }/* log.info(JSON.stringify(info)) */)
    //   .catch((err) => log.error(`[Mail controller] Error saving mail error to DB: ${JSON.stringify(err)}`));
  });
};

const setEmailFrom = (message) => {
  let email = mailerConfig.auth.user;
  if (!email.includes('@')) {
    let { host } = mailerConfig;
    const first = host.indexOf('.');
    const last = host.lastIndexOf('.');
    if (first !== last) {
      if (host.substring(first, last).indexOf('.') === -1) {
        host = host.substring(first + 1);
      } else {
        host = host.substring(host.lastIndexOf('.') + 1);
      }
    }
    email = `${email}@${host}`;
  }
  const emailPair = { from: email };
  const extendedMessage = JSON.parse(JSON.stringify(message));
  Object.assign(extendedMessage, emailPair);
  return extendedMessage;
};

module.exports = { sendMail };
