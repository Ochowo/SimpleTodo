import mongoose from 'mongoose';
import app from './app';
import config from './src/helpers/config';
import mailer from './src/services/mailer';
import rabbitMQ from './src/messaging/rabbitMQ';

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  rabbitMQ.start();
  mailer.start();
  console.log('Connected to MongoDB');
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
