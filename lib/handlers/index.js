const fs = require('fs');

module.exports.getHandlerByName = (handlerName) => {
  let availableHandlers = fs.readdirSync(__dirname + './', {
    withFileTypes: true,
  });
  availableHandlers = availableHandlers
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (!availableHandlers.includes(handlerName)) {
    return null;
  }

  return require(`./${handlerName}`);
};
