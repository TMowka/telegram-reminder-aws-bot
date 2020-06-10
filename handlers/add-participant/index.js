const participants = require('../../participants');

module.exports = async function (chatId, message) {
  participants.add(message);
};
