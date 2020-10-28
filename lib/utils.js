/**
 * Split method name and data
 * @param {string} [text] Text message to split
 * @return {string[]} Method name and data
 */
module.exports.splitMethodNameAndData = (text = '') => {
  if (text.indexOf('/') !== 0) {
    return [];
  }

  let textMessage = '';
  if (text.indexOf(' ') !== -1 && text.indexOf(' ') !== text.length - 1) {
    textMessage = text.substr(text.indexOf(' ') + 1);
  }

  let methodName;
  if (text.indexOf('@') !== -1) {
    methodName = text.substr(1, text.indexOf('@') - 1);
  } else if (text.indexOf(' ') !== -1) {
    methodName = text.substr(1, text.indexOf(' ') - 1);
  } else {
    methodName = text.substr(1);
  }

  return [methodName, textMessage];
};
