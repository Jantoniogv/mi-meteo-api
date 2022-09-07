const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeteoSchema = Schema({
  location: String,
  temp: Number,
  hum: Number,
  water: Number,
  pressure: Number,
});

module.exports = mongoose.model("MeteoDates", MeteoSchema);
