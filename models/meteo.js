const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeteoSchema = Schema({
  location: String,
  date: {
    type: Date,
  },
  temp: Number,
  hum: Number,
  water: Number,
  pressure: Number,

  avg_wind: Number,
  min_wind: Number,
  max_wind: Number,
  dir_wind: String,

  voltaje_bat: Number,
});

module.exports = mongoose.model("MeteoDates", MeteoSchema);
