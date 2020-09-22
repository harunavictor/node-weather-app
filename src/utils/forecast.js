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

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to access weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          ",  it is currently " +
          body.current.temperature +
          " degrees out there , it feels like  " +
          body.current.feelslike +
          " degree out. The humidity is  " +
          body.current.humidity +
          ", and there is a  " +
          body.current.precip +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
