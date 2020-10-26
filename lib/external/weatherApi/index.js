const rp = require('request-promise');
const {OPEN_WEATHER_MAP_API_KEY} = require('../../../constants');

module.exports.getHourlyForecast = async (city = 'Minsk') => {
  const options = {
    method: 'GET',
    uri: `pro.openweathermap.org/data/2.5/forecast/hourly`,
    qs: {
      q: `${city},BY`,
      units: 'metric',
      appid: OPEN_WEATHER_MAP_API_KEY,
    },
  };

  return rp(options);
};
