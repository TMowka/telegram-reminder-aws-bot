// handlers
const helloHandler = require('./handlers/hello');
const defaultHandler = require('./handlers/default');

/**
 * Eject method name from text message.
 * @param {string} message Text message, eject method name from.
 * @return {string} Method name or empty string.
 */
function getMethodFromMessage(message) {
  if (message.indexOf('/') === -1) {
    return '';
  }

  let lastIndex = message.indexOf(' ');
  if (lastIndex === -1) {
    lastIndex = message.length;
  }

  return message.substr(0, lastIndex);
}

module.exports.webhook = async (event) => {
  const body = JSON.parse(event.body);
  const { chat, text } = body.message;

  const method = getMethodFromMessage(text);

  switch (method) {
    case '/hello':
      return helloHandler(chat.id);

    default:
      return defaultHandler(chat.id);
  }
};
