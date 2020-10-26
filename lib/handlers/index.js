module.exports.getHandlerByName = (handlerName) => {
  return require(`./${handlerName}`);
};
