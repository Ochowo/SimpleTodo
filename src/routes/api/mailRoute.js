import { Router } from 'express';
import mailCtrl from '../../messaging/mailController';
import mailerResponse from '../../models/mailerResponse';

const log = require('pino')({ prettyPrint: true });

const router = Router();

router.post('/send', (req, res) => {
  const mail = {
    to: req.body.email,
    subject: 'Invitation to join todo app',
    text: 'Hey there! Join todo app and become more productive',
    html: '<p>Hey there!<br> Join todo app and become more productive</p><br><p>Click <a href="http://localhost:3000/api/vi/auth/signup">here</a> to register</p>',
  };
  console.log(mail, 'pgt');
  log.debug(`REST request to send a mail: ${JSON.stringify(mail)}`);
  mailCtrl.sendMail(mail, false);
  mailerResponse.message = 'Mail has been sent!';
  return res.status(200).json(mailerResponse);
});

export default router;
