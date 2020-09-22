const request = require("request");

// const forecast =  => {
//   const url =
//     "http://api.weatherstack.com/current?access_key=c03bd585509ba573b18896ea4549739b&query="+ lat " &units=f";
// };

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c03bd585509ba573b18896ea4549739b&query=" +
    latitude +
    "," +
    longitude +
    " &units=f";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to access weather service", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions +
          ",  it is currently " +
          response.body.current.temperature +
          " degrees out there ," +
          " there is a " +
          response.body.current.precip +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
