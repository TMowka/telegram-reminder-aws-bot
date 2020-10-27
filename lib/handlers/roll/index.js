const {sendMessage} = require('../../external/botApi');

/**
 * Generate random number in range from 1 to 10 (by default)
 * @param {number} max - Top of the range to generate random number for
 * @return {number} Random number in specified range
 */
function generateRandomNumberInRange(max = 10) {
  const min = 1;
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = async (chatId, maxRange) => {
  maxRange = Number.parseInt(maxRange, 10);

  if (Number.isNaN(maxRange)) {
    maxRange = 100;
  } else if (maxRange > 10000) {
    maxRange = 10000;
  }

  await sendMessage(chatId, generateRandomNumberInRange(maxRange));
};
