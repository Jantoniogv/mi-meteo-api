const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeteoSchema = Schema({
  location: String,
  date: {
    type: date,
    default: new date(),
  },
  temp: Number,
  hum: Number,
  water: Number,
  pressure: Number,

  avg_wind: Number,
  min_wind: Number,
  max_wind: Number,
  dir_wind: String,
});

module.exports = mongoose.model("MeteoDates", MeteoSchema);
