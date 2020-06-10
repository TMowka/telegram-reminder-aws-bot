const {sendMessage} = require('../../bot');
const {PROJECT_SERVER_LINK} = require('../../constants');

module.exports = async function (chatId) {
  await sendMessage(chatId, PROJECT_SERVER_LINK);
};
