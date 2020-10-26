const {getHandlerByName} = require('./lib/handlers');
const {REMIND_CHAT_ID} = require('./constants');

/**
 * Split method name and text message
 * @param {string} message Text message to split
 * @return {string[]} Method name and message
 */
function splitMethodNameAndMessage(message) {
  if (message.indexOf('/') === -1) {
    return [];
  }

  let lastIndex = message.indexOf(' ');
  if (lastIndex === -1) {
    lastIndex = message.length;
  }

  const methodName = message.substr(1, lastIndex);
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

  const handler = await getHandlerByName(methodName);
  const unknownHandler = await getHandlerByName('unknown');
  if (handler) {
    await handler(chat.id, message);
  } else {
    await unknownHandler(chat.id);
  }

  return {statusCode: 200};
};

module.exports.remind = async () => {
  const handler = await getHandlerByName('remind');
  await handler(REMIND_CHAT_ID);
  return {statusCode: 200};
};
