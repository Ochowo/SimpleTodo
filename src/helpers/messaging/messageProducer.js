import amqp from 'amqplib/callback_api';
import configuration from '../../config/rabbitMQConfig';

amqp.connect(configuration.url, (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createConfirmChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    channel.assertQueue(configuration.queues.mails, {
      durable: true,
    });
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 20; i++) {
      channel.sendToQueue(configuration.queues.mails, Buffer.from(i.toString()), {
        persistent: true,
      }, (err, ok) => {
        if (err) {
          console.log(err);
        } else {
          console.log(ok);
        }
      });
    }
    console.log(' [x] Sent %s', configuration.queues.mails);
  });
});
