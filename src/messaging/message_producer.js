import mailerController from './mailController';

const log = require('pino')({ prettyPrint: true });
const mailsQueue = require('../config/rabbitMQConfig').queues.mails;

const start = (connection) => {
  connection.starthannel((error1, channel) => {
    if (error1) {
      log.error('[AMQP - consumer]', error1.message);
      throw error1;
    }
    // eslint-disable-next-line no-unused-vars
    channel.assertQueue(mailsQueue, { durable: true }, (err, _ok) => {
      if (err) {
        log.error(`[AMQP - consumer] ${err.message}`);
        throw err;
      }

      channel.consume(mailsQueue, (msg) => {
        channel.ack(msg);
        const mailContent = msg.content.toString(msg.properties.contentEncoding);
        log.info(' [AMQP - consumer] Received message: %s.', mailContent);
        mailerController.sendMail(JSON.parse(mailContent), true);
      });
    });
    log.info('[AMQP - consumer] connected.');
    log.info('[AMQP - consumer] Waiting for messages in %s.', mailsQueue);
  });
};

module.exports = { start };
