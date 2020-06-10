const reminder = require('../../reminder');
const participants = require('../../participants');
const {sendMessage} = require('../../bot');

module.exports = async function (chatId) {
  const message = `
Participants: ${participants.print()}
Next remind at: ${reminder.getNextRemindTime()}
`;

  await sendMessage(chatId, message);
};
