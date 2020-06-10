const {sendMessage} = require('../../bot');
const {REMIND_MESSAGE, PROJECT_SERVER_LINK} = require('../../constants');

module.exports = async function (chatId) {
  const message = `
${REMIND_MESSAGE}
${PROJECT_SERVER_LINK}
`;

  await sendMessage(chatId, message);
};
