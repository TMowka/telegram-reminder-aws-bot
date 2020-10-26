const {promises: fs} = require('fs');
const path = require('path');

module.exports.getHandlerByName = async (handlerName) => {
  const currDirPath = path.resolve(__dirname, './');
  let availableHandlers = await fs.readdir(currDirPath, {withFileTypes: true});
  availableHandlers = availableHandlers
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (!availableHandlers.includes(handlerName)) {
    return null;
  }

  return require(`./${handlerName}`);
};
