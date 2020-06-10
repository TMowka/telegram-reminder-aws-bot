const helloHandler = require('./hello');
const remindHandler = require('./remind');
const linkHandler = require('./link');

module.exports = {
  '/hello': helloHandler,
  '/remind': remindHandler,
  '/link': linkHandler,
};
