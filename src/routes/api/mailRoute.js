import { Router } from 'express';
import { sendEMail } from '../../controllers/mailController';

const router = Router();

router.post('/send', (req, res) => {
  const mail = {
    to: req.body.email,
    subject: 'Invitation to join todo app',
    text: 'Hey there! Join todo app and become more productive',
    html: '<p>Hey there!<br> Join todo app and become more productive</p><br><p>Click <a href="http://localhost:3000/api/vi/auth/signup">here</a> to register</p>',
  };
  console.log(mail, 'pgt');
  sendEMail(mail);
  const mailerResponse = {
    message: 'Mail has been sent!',
    time: new Date(),
  };
  return res.status(200).json(mailerResponse);
});

export default router;
