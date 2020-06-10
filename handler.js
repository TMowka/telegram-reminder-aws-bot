// handlers
const handlers = require('./handlers');
const unknownHandler = require('./handlers/unknown');
const remindHandler = require('./handlers/remind');
const {REMIND_CHAT_ID} = require('./constants');

/**
 * Split method name and text message
 * @param {string} message Text message to split
 * @return {Array} Method name and message
 */
function splitMethodNameAndMessage(message) {
  if (message.indexOf('/') === -1) {
    return [];
  }

  let lastIndex = message.indexOf(' ');
  if (lastIndex === -1) {
    lastIndex = message.length;
  }

  const methodName = message.substr(0, lastIndex);
  const textMessage = message.substr(lastIndex + 1);
  return [methodName, textMessage];
}

module.exports.webhook = async (event) => {
  const body = JSON.parse(event.body);
  const {chat, text} = body.message;

  const [methodName, message] = splitMethodNameAndMessage(text);
  if (!methodName) {
    return {statusCode: 200};
  }

  const method = handlers[methodName];
  if (method) {
    await method(chat.id, message);
  } else {
    await unknownHandler(chat.id);
  }

  return {statusCode: 200};
};

module.exports.remind = async () => {
  await remindHandler(REMIND_CHAT_ID);
  return {statusCode: 200};
};
