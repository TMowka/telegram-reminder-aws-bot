module.exports.getHandlerByName = async (handlerName) => {
  return require(`./${handlerName}`);
};
