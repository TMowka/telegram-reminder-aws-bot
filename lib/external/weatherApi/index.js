const rp = require('request-promise');
const {OPEN_WEATHER_MAP_API_KEY} = require('../../../constants');

module.exports.getDailyForecast = async (city) => {
  const options = {
    method: 'GET',
    uri: 'http://api.openweathermap.org/data/2.5/forecast',
    qs: {
      q: `${city || 'Minsk'},BY`,
      units: 'metric',
      appid: OPEN_WEATHER_MAP_API_KEY,
    },
  };

  return rp(options);
};
