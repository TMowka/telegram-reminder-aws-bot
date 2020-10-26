const {getHandlerByName} = require('./lib/handlers');
const {REMIND_CHAT_ID} = require('./constants');

/**
 * Split method name and text message
 * @param {string} [message] Text message to split
 * @return {string[]} Method name and message
 */
function splitMethodNameAndMessage(message = '') {
  if (message.indexOf('/') === -1) {
    return [];
  }

  let methodName;
  const textMessage =
    message.indexOf(' ') !== -1 && message.indexOf(' ') !== message.length - 1
      ? message.substr(message.indexOf(' ') + 1)
      : '';

  if (message.indexOf('@') !== -1) {
    methodName = message.substr(1, message.indexOf('@') - 1);
  } else {
    methodName = message.substr(1, message.indexOf(' ') - 1);
  }

  return [methodName, textMessage];
}

module.exports.webhook = async (event) => {
  const body = JSON.parse(event.body);

  if (!body.message) {
    return {statusCode: 200};
  }

  const {chat, text} = body.message;

  const [methodName, message] = splitMethodNameAndMessage(text);
  if (!methodName) {
    return {statusCode: 200};
  }

  const handler = getHandlerByName(methodName);
  const unknownHandler = getHandlerByName('unknown');
  if (handler) {
    await handler(chat.id, message);
  } else {
    await unknownHandler(chat.id);
  }

  return {statusCode: 200};
};

module.exports.remind = async () => {
  const handler = getHandlerByName('remind');
  await handler(REMIND_CHAT_ID);
  return {statusCode: 200};
};
