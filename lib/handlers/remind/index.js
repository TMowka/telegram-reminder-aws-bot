const {sendAnimation} = require('../../external/botApi');
const {REMIND_ANIMATION} = require('../../../constants');

module.exports = async (chatId) => {
  await sendAnimation(chatId, REMIND_ANIMATION);
};
