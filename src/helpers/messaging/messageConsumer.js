import amqp from 'amqplib/callback_api';
import configuration from '../../config/rabbitMQConfig';

amqp.connect(configuration.url, (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    channel.assertQueue(configuration.queues.mails, {
      durable: true,
    });
    channel.prefetch(10);
    channel.consume(configuration.queues.mails, (msg) => {
      console.log(' [x] Received %s',
        msg.content.toString());
      setTimeout(() => {
        console.log(' [x] Done');
        channel.ack(msg);
      }, 7000);
    }, {
      noAck: false,
    });
  });
});
