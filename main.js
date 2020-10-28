const i18n = require('i18n');
const moment = require('moment');
const path = require('path');
const {getHandlerByName} = require('./lib/handlers');
const {splitMethodNameAndData} = require('./lib/utils');
const {LOCALE, REMIND_CHAT_ID} = require('./constants');

i18n.configure({
  locales: ['ru', 'en'],
  directory: path.join(__dirname, '/lib/locales'),
  objectNotation: true,
});

i18n.setLocale(LOCALE);
moment.locale(LOCALE);

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
