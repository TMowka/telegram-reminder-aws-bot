const rp = require('request-promise');
const {TELEGRAM_TOKEN} = require('../../../constants');

module.exports.sendMessage = async (chatId, message) => {
  const options = {
    method: 'GET',
    uri: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    qs: {
      chat_id: chatId,
      text: message,
    },
  };

  return rp(options);
};

module.exports.sendAnimation = async (chatId, animation) => {
  const options = {
    method: 'GET',
    uri: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendAnimation`,
    qs: {
      chat_id: chatId,
      animation,
    },
  };

  return rp(options);
};
