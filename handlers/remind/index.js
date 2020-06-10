const participants = require('../../participants');
const {sendMessage} = require('../../bot');
const {REMIND_MESSAGE} = require('../../constants');

module.exports = async function (chatId) {
  const message = `${participants.print()}\n${REMIND_MESSAGE}`;
  await sendMessage(chatId, message);
};
