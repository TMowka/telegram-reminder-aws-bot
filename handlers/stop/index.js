const reminder = require('../../reminder');

module.exports = async function () {
  reminder.stop();
};
