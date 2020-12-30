module.exports = {
  url: `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
  queues: {
    mails: process.env.RABBITMQ_QUEUE_MAILS,
    results: process.env.RABBITMQ_QUEUE_MAILS_RESULTS,
  },
};
