// import emailErrorService from '../services/email_error_service';
import mailer from './mailer';
import Email from '../models/emailModel';
// import EmailError from '../model/email_error_schema';
import resultSender from './rabbitMQService';

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
