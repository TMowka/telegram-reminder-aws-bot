const participants = [];

/**
 * Add participant if it was not added yet
 * @param {string} name Participant name
 */
module.exports.add = function (name) {
  if (participants.indexOf(name) >= 0) {
    return;
  }

  participants.push(name);
};

/**
 * Remove participant
 * @param {string} name Participant name
 */
module.exports.remove = function (name) {
  const participantIdx = participants.indexOf(name);
  if (participantIdx === -1) {
    return;
  }

  participants.splice(participantIdx, 1);
};

/**
 * Return a list of participants as a string
 * @return {string} Participant list as string
 */
module.exports.print = function () {
  return participants.join(', ');
};
