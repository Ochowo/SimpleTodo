const sender = require('./message_producer');

const sendPositiveResult = (email) => {
  sender.sendResult(JSON.stringify({ success: true }));
};

const sendNegativeResult = () => {
  sender.sendResult(JSON.stringify({ success: false }));
};

module.exports = { sendPositiveResult, sendNegativeResult };
