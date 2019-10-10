const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 5000;

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Radwane El jerrari"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rad1 wld raji"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful Text",
    title: "Help",
    name: "Radwane Jr."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must Provide an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({ error: "You must provide a search term" });
//   }
//   res.json({
//     products: []
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found.",
    title: "404",
    name: "RADWANE JIRRARI"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    title: "404",
    name: "RADWANE JIRRARI"
  });
});

app.listen(port, () => {
  console.log(`Server is up and Listening on port ${port}.`);
});
