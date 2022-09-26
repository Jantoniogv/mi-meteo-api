const API_VERSION = "v1";
const PORT_SERVER = process.env.PORT || 3977;
const MONGOHOST = process.env.MONGOHOST || "localhost";
const MONGOUSER = process.env.MONGOUSER || "";
const MONGOPASSWORD = process.env.MONGOPASSWORD || "";
const MONGOPORT = process.env.MONGOPORT || 27017;

module.exports = {
  API_VERSION,
  PORT_SERVER,
  MONGOHOST,
  MONGOUSER,
  MONGOPASSWORD,
  MONGOPORT,
};
