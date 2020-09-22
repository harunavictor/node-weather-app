const geoCode = require("../src/utils/geocode.js");
const forecast = require("../src/utils/forecast.js");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup a static directory to serve
app.use(express.static(publicDirectoryPath));

// setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "victor",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Victor sax",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Victor sax",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dewinner sax",
    errorMessage: " Requested help Page not found!!!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dewinner sax",
    errorMessage: " Requested Page not found!!!",
  });
});

app.listen(port, () => {
  console.log("listening on port "+ port);
});
