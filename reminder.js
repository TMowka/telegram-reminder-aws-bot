// const INTERVAL = 60 * 60 * 24 * 1000; // 24h
const INTERVAL = 60 * 1000; // 1min

let ticker;
let remindTimestamp;
let remindMessage = 'Fill in project server, please';

/**
 * Parse remind time to timestamp of next remind
 * @param {string} remindTime Remind time in format HH:MM
 * @return {number} Timestamp of next remind or 0
 */
function parseRemindTime(remindTime) {
  let timestamp = 0;

  if (!remindTime || remindTime.indexOf(':') === -1) {
    return timestamp;
  }

  const [h, m] = remindTime.split(':');
  const time = new Date();
  time.setHours(+h);
  time.setMinutes(+m);
  time.setSeconds(0);

  timestamp = time.getTime();

  while (timestamp <= new Date().getTime()) {
    timestamp += INTERVAL;
  }

  return timestamp;
}

/**
 * Start reminder or restart if it was already started
 * @param {string} remindTime Remind time in format HH:MM
 * @param {function} cb Callback to be called to remind
 */
module.exports.start = function (remindTime, cb) {
  if (ticker) {
    clearInterval(ticker);
  }

  remindTimestamp = parseRemindTime(remindTime);
  if (!remindTimestamp) {
    return;
  }

  ticker = setInterval(() => {
    if (remindTimestamp >= new Date().getTime()) {
      remindTimestamp += INTERVAL;
      cb(remindMessage);
    }
  }, 1000);
};

/**
 * Stop reminder
 */
module.exports.stop = function () {
  if (ticker) {
    clearInterval(ticker);
  }
};

/**
 * Set remind message
 * @param {string} message Remind message
 */
module.exports.setRemindMessage = function (message) {
  remindMessage = message;
};

/**
 * Get next remind time as a string
 * @return {string} Next remind time
 */
module.exports.getNextRemindTime = function () {
  if (!ticker || !remindTimestamp) {
    return '';
  }

  return new Date(remindTimestamp).toISOString();
};
