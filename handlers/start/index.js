const reminder = require('../../reminder');
const participants = require('../../participants');
const {sendMessage} = require('../../bot');

module.exports = async function (chatId, message) {
  reminder.start(message, async (remindMessage) => {
    const message = `${participants.print()}\n${remindMessage}`;
    await sendMessage(chatId, message);
  });
};
