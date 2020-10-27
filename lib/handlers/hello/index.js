const {sendMessage} = require('../../external/botApi');

module.exports = async (chatId) => {
  await sendMessage(chatId, 'ALLO');
};
