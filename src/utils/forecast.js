const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8a88f2bb70183e832371908736a4a078/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('"Unable to connect to weather service!"', undefined);
    } else if (body.error) {
      callback("Unable To find Location");
    } else {
      const sentence = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. the humidity is about ${body.currently.humidity}`;
      callback(undefined, sentence);
    }
  });
};

module.exports = forecast;
