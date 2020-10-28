const i18n = require('i18n');
const {sendMessage} = require('../../external/botApi');

module.exports = async (chatId) => {
  await sendMessage(chatId, i18n.__('hello.message'));
};
