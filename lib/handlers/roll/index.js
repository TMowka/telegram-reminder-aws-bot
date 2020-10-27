const {sendMessage} = require('../../external/botApi');

/**
 * Generate random number in range from 1 to 5 (by default)
 * @param {number} max - Top of the range to generate random number for
 * @return {number} Random number in specified range
 */
function generateRandomNumberInRange(max = 5) {
  const min = 1;

  return Math.random() * (max - min) + min;
}

module.exports = async (chatId, maxRange) => {
  maxRange = Number.parseInt(maxRange, 10);

  if (Number.isNaN(maxRange)) {
    maxRange = 5;
  } else if (maxRange > 10000) {
    maxRange = 10000;
  }

  await sendMessage(chatId, generateRandomNumberInRange(maxRange));
};
