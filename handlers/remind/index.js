const {sendAnimation} = require('../../bot');
const {REMIND_ANIMATION} = require('../../constants');

module.exports = async function (chatId) {
  const animation = REMIND_ANIMATION;

  await sendAnimation(chatId, animation);
};
