/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import nodemailer from 'nodemailer';
import mailerConfig from '../../config/mailerConfig';

const mailerConfiguration = require('../../config/mailerConfig')();

let transporter = null;

export const sendMail = async (message) => {
  transporter = nodemailer.createTransport(mailerConfig());
  message = setEmailFrom(message);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

export const setEmailFrom = (message) => {
  let email = mailerConfiguration.auth.user;
  console.log(mailerConfig);
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
