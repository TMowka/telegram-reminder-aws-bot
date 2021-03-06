const i18n = require('i18n');
const moment = require('moment');
const {getDailyForecast} = require('../../external/weatherApi');
const {sendMessage} = require('../../external/botApi');

/**
 * Map forecast data to dorecast list
 * @param {Object} forecastData
 * @param {Object[]} [forecastData.list] - forecast data for every 3h timestamp
 * @return {string} - Forecast list
 */
function mapForecastData({list = []}) {
  return list
    .filter((item) => {
      const hours = moment.utc(item.dt * 1000).get('hours');
      return hours === 15;
    })
    .map((item) => {
      const date = moment.utc(item.dt * 1000).format('MMM Do');
      return `${date} - ${item.main.temp}°C (${i18n.__('weather.cloudness')} ${
        item.clouds.all
      }%)`;
    })
    .join('\n');
}

module.exports = async (chatId, city) => {
  let forecast;

  try {
    const forecastRawData = await getDailyForecast(city);
    const forecastData = JSON.parse(forecastRawData);
    forecast = mapForecastData(forecastData);
  } catch (error) {
    forecast = i18n.__('weather.noData');
  }

  await sendMessage(chatId, forecast);
};
