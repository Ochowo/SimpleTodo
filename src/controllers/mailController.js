/* eslint-disable import/prefer-default-export */

import { sendMail } from '../helpers/messaging/nodeMailer';

export const sendEMail = (mail) => {
  sendMail(mail);
};
