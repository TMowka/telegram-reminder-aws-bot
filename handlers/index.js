const helloHandler = require('./hello');
const addParticipantHandler = require('./add-participant');
const removeParticipantHandler = require('./remove-participant');
const remindHandler = require('./remind');

module.exports = {
  '/hello': helloHandler,
  '/addparticipant': addParticipantHandler,
  '/removeparticipant': removeParticipantHandler,
  '/remind': remindHandler,
};
