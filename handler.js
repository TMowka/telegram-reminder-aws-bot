// handlers
const handlers = require('./handlers');
const unknownHandler = require('./handlers/unknown');

/**
 * Eject method name from text message.
 * @param {string} message Text message, eject method name from.
 * @return {string} Method name or empty string.
 */
function getMethodNameFromMessage(message) {
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
  const {chat, text} = body.message;

  const methodName = getMethodNameFromMessage(text);
  if (!methodName) {
    return {statusCode: 200};
  }

  const method = handlers[methodName];
  if (method) {
    return method(chat.id);
  }

  return unknownHandler(chat.id);
};
