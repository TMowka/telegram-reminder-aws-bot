const {getHandlerByName} = require('./lib/handlers');
const {REMIND_CHAT_ID} = require('./constants');

/**
 * Split method name and data
 * @param {string} [text] Text message to split
 * @return {string[]} Method name and data
 */
function splitMethodNameAndData(text = '') {
  if (text.indexOf('/') !== 0) {
    return [];
  }

  let textMessage = '';
  if (text.indexOf(' ') !== -1 && text.indexOf(' ') !== text.length - 1) {
    textMessage = text.substr(text.indexOf(' ') + 1);
  }

  let methodName;
  if (text.indexOf('@') !== -1) {
    methodName = text.substr(1, text.indexOf('@') - 1);
  } else if (text.indexOf(' ') !== -1) {
    methodName = text.substr(1, text.indexOf(' ') - 1);
  } else {
    methodName = text.substr(1);
  }

  return [methodName, textMessage];
}

module.exports.webhook = async (event) => {
  const body = JSON.parse(event.body);
  if (!body.message) {
    return {statusCode: 200};
  }

  const {chat, text} = body.message;

  const [methodName, methodData] = splitMethodNameAndData(text);
  if (!methodName) {
    return {statusCode: 200};
  }

  const handler = getHandlerByName(methodName);
  const unknownHandler = getHandlerByName('unknown');
  if (handler) {
    await handler(chat.id, methodData);
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
