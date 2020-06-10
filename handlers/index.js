const helloHandler = require('./hello');
const remindHandler = require('./remind');

module.exports = {
  '/hello': helloHandler,
  '/remind': remindHandler,
};
