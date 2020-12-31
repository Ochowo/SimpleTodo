/* eslint-disable no-restricted-syntax */
import amqp from 'amqplib/callback_api';
import { url } from '../config/rabbitMQConfig';
import sender from './message_producer';
import receiver from './message_consumer';

const log = require('pino')({ prettyPrint: true });

const amqpConn = [];
let processExit = false;

const connect = (worker) => {
  amqp.connect(url, (err, conn) => {
    if (err) {
      log.error('[AMQP]', err.message);
      return setTimeout(start, 1000);
    }
    conn.on('error', (err) => {
      if (err.message !== 'Connection closing') {
        log.error('[AMQP] connection error. ', err.message);
        log.error(err);
      }
      log.error(err);
    });
    conn.on('close', () => {
      if (processExit) {
        return;
      }
      log.info('[AMQP] reconnecting');
      setTimeout(start, 1000);
    });
    amqpConn.push(conn);
    worker.start(conn);
  });
};
const start = () => {
  log.info('[AMQP] connecting...');
  connect(receiver);
  connect(sender);
};
process.on('exit', (code) => {
  log.info('[AMQP] closing connection.');
  processExit = true;
  for (const conn of amqpConn) {
    conn.close();
    log.info('[AMQP] connection closed.');
  }
});

export default { start };
