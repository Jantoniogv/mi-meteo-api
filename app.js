const express = require("express");
//const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config.js");

const path = require("path");

// Load routings
//const authRoutes = require("./routes/auth");
const meteoRoutes = require(`./routes/${API_VERSION}/meteo`);
//const menuRoutes = require("./routes/menu");

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Configure Header HTTP
app.use((req, res, next) => {
  res.header("access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Router Basic

app.use("/", express.static(path.join(__dirname, "build")));

/* app.use(`/`, (req, res) => {
  res.status(200).send({ check: "correcto" });
}); */

app.use(`/api/${API_VERSION}`, meteoRoutes);
//app.use(`/api/${API_VERSION}`, menuRoutes);

module.exports = app;
