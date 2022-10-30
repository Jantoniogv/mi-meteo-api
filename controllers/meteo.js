//const fs = require("fs");
//const path = require("path");
//const bcrypt = require("bcrypt");
//const jwt = require("../services/jwt");
const Meteo = require("../models/meteo");
//const { exists } = require("../models/meteo");

function addMeteoDates(req, res) {
  const meteo = new Meteo();

  const {
    location,
    date,
    temp,
    water,
    hum,
    pressure,
    avg_wind,
    min_wind,
    max_wind,
    dir_wind,
    voltaje,
  } = req.body;
  meteo.location = location;
  meteo.date = date;
  meteo.temp = temp;
  meteo.hum = hum;
  meteo.pressure = pressure;
  meteo.water = water;
  meteo.avg_wind = avg_wind;
  meteo.min_wind = min_wind;
  meteo.max_wind = max_wind;
  meteo.dir_wind = dir_wind;
  meteo.voltaje_bat = voltaje;

  //console.log(typeof water);

  if (!typeof temp === "number" && !typeof water === "number") {
    res
      .status(500)
      .send({ message: "Los datos no tienen la estructura correcta" });
  } else {
    meteo.save((err, meteoStored) => {
      if (err) {
        res.status(500).send({ message: "El dato meteorologico ya existe" });
      } else {
        if (!meteoStored) {
          res
            .status(404)
            .send({ message: "Error al crear el dato meteorologico." });
        } else {
          res.status(200).send({ meteo: meteoStored });
        }
      }
    });
  }

  console.log(req.body);
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function getMeteoDates(req, res) {
  Meteo.find().then((meteoDates) => {
    if (!meteoDates) {
      res
        .status(404)
        .send({ message: "No se ha encontrado ningun dato meteorologico" });
    } else {
      res.status(200).send({ meteoDates });
    }
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function getCurrentMeteoDates(req, res) {
  const locationString = req.query.location;
  console.log(req.query);
  Meteo.find({ location: locationString })
    .sort({ date: -1 })
    .limit(1)
    .then((meteoDates) => {
      // console.log(meteoDates);
      if (!meteoDates) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun dato meteorologico" });
      } else {
        res.status(200).send({ meteoDates });
      }
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function getFilterMeteoDates(req, res) {
  const query = req.query;

  const endInterval = query.endInterval;
  const startInterval = query.startInterval;

  console.log(req.query);

  console.log(new Date(endInterval));
  console.log(new Date(startInterval).toLocaleString());

  let matchArray = [
    {
      $match: {
        $and: [
          { location: `${query.location}` },
          { date: { $gte: new Date(startInterval) } },
          { date: { $lte: new Date(endInterval) } },
        ],
      },
    },
  ];

  let queryArray = queryAggregateSort(query);

  let queryAggregate = matchArray.concat(queryArray[0]);

  console.log(queryArray);

  Meteo.aggregate(queryAggregate)
    .sort(queryArray[1])
    .then((meteoDates) => {
      if (!meteoDates) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun dato meteorologico" });
      } else {
        console.log(meteoDates);
        res.status(200).send({ meteoDates });
      }
    });
}

const queryAggregateSort = (query) => {
  let queryGroup;
  let queryGroupReplace;
  let querySort;

  if (query.time === "a") {
    queryGroup = `{"$group":{"_id":{"date":{"$toDate":"$date"}},`;
    querySort = `{"_id.date": -1}`;
  } else if (query.time === "h") {
    queryGroup = `{"$group":{"_id":{"hour":{"$hour":"$date"},"day":{"$dayOfMonth":"$date"},"month":{"$month":"$date"},"year":{"$year":"$date"}},`;
    querySort = `{"_id.year": -1,"_id.month": -1,"_id.day": -1,"_id.hour": -1}`;
  } else if (query.time === "d") {
    queryGroup = `{"$group":{"_id":{"day":{"$dayOfMonth":"$date"},"month":{"$month":"$date"},"year":{"$year":"$date"}},`;
    querySort = `{"_id.year": -1,"_id.month": -1,"_id.day": -1}`;
  } else if (query.time === "m") {
    queryGroup = `{"$group":{"_id":{"month":{"$month":"$date"},"year":{"$year":"$date"}},`;
    querySort = `{"_id.year": -1,"_id.month": -1}`;
  } else if (query.time === "y") {
    queryGroup = `{"$group":{"_id":{"year":{"$year":"$date"}},`;
    querySort = `{"_id.year": -1}`;
  }

  if (Number(query.temp)) {
    queryGroup = queryGroup.concat(`"temp":{"$avg":"$temp"},`);
  }

  if (Number(query.tempMax)) {
    queryGroup = queryGroup.concat(`"temp":{"$max":"$temp"},`);
  }

  if (Number(query.tempMin)) {
    queryGroup = queryGroup.concat(`"temp":{"$min":"$temp"},`);
  }

  if (Number(query.hum)) {
    queryGroup = queryGroup.concat(`"hum":{"$avg":"$hum"},`);
  }

  if (Number(query.pressure)) {
    queryGroup = queryGroup.concat(`"pressure":{"$avg":"$pressure"},`);
  }

  if (Number(query.water)) {
    queryGroup = queryGroup.concat(`"water":{"$sum":"$water"},`);
  }

  /* if (Number(query.dir_wind)) {
    queryGroup = queryGroup.concat(`,"dir_wind":{"$sum":"$water"}`);
  } */

  if (Number(query.avg_wind)) {
    queryGroup = queryGroup.concat(`"avg_wind":{"$avg":"$avg_wind"},`);
  }

  if (Number(query.max_wind)) {
    queryGroup = queryGroup.concat(`"max_wind":{"$max":"$max_wind"},`);
  }

  if (Number(query.min_wind)) {
    queryGroup = queryGroup.concat(`"min_wind":{"$min":"$min_wind"},`);
  }

  queryGroup = queryGroup.concat(`}}#`);

  queryGroupReplace = queryGroup.replace(`,}}#`, `}}`); //Quitamos la ultima como y reemplazamos la cadena de la consulta

  let queryArray = [JSON.parse(queryGroupReplace), JSON.parse(querySort)];

  return queryArray;
};

module.exports = {
  addMeteoDates,
  getMeteoDates,
  getFilterMeteoDates,
  getCurrentMeteoDates,
  //uploadAvatar,
  //getAvatar,
  //updateUser,
};
