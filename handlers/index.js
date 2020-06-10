const helloHandler = require('./hello');
const infoHandler = require('./info');
const addParticipantHandler = require('./add-participant');
const removeParticipantHandler = require('./remove-participant');
const startHandler = require('./start');
const stopHandler = require('./stop');

module.exports = {
  '/hello': helloHandler,
  '/info': infoHandler,
  '/addparticipant': addParticipantHandler,
  '/removeparticipant': removeParticipantHandler,
  '/start': startHandler,
  '/stop': stopHandler,
};
