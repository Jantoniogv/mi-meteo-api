const mongoose = require("mongoose");
const app = require("./app");

const {
  PORT_SERVER,
  API_VERSION,
  MONGOHOST,
  MONGOUSER,
  MONGOPASSWORD,
  MONGOPORT,
} = require("./config.js");

mongoose.connect(
  `mongodb://${{ MONGOUSER }}:${{ MONGOPASSWORD }}@${{ MONGOHOST }}:${{
    MONGOPORT,
  }}`,
  //`mongodb://${IP_SERVER}:${PORT_DB}/MiMeteoDB`,
  { useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexion DB esta ok");

      app.listen(PORT_SERVER, () => {
        console.log("############################");
        console.log("######### API REST #########");
        console.log("############################");
        console.log(`http://${MONGOHOST}:${PORT_SERVER}/api/${API_VERSION}/`);
      });
    }
  }
);
