const {sendMessage} = require('../bot');

module.exports = async function (chatId) {
  await sendMessage(chatId, 'Unknown command');
};
