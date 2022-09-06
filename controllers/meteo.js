//const fs = require("fs");
//const path = require("path");
//const bcrypt = require("bcrypt");
//const jwt = require("../services/jwt");
const Meteo = require("../models/meteo");
//const { exists } = require("../models/meteo");

function addMeteoDates(req, res) {
  const meteo = new Meteo();

  console.log(req.body);

  const { temp, water } = req.body;
  meteo.temp = temp;
  meteo.water = water;

  console.log(typeof water);

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

  //  console.log(req.body);
}

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

/* function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else if (!check) {
            res.status(404).send({ message: "La contraseña no es correcta." });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 200, message: "El usuario no se ha activado." });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccesToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
} */

/* function getUsersActive(req, res) {
  const query = req.query;

  User.find({ active: query.active }).then((users) => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario" });
    } else {
      res.status(200).send({ users });
    }
  });
}

function uploadAvatar(req, res) {
  const params = req.params;

  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del sevidor." });
    } else {
      if (!userData) {
        res.status(404).send({ message: "No se ha encontrado ningun usuario" });
      } else {
        let user = userData;

        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("\\");
          let fileName = fileSplit[2];
          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpg") {
            res.status(400).send({
              message: "La extension de la imagen no es valida. [.png y .jpg]",
            });
          } else {
            user.avatar = fileName;

            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del sevidor." });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .send({ message: "No se ha encontrado ningun usuario" });
                  } else {
                    res.status(200).send({ avatarName: user.avatar });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({ message: "El avatar que buscas no existe." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

async function updateUser(req, res) {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;
  console.log("antes de antes" + userData.password);

  if (userData.password) {
    await bcrypt.hash(userData.password, 2, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña" });
      } else {
        userData.password = hash;

        updateUserDB(userData, params, res);
        console.log(userData.password);
      }
    });
  } else {
    updateUserDB(userData, params, res);
  }

  console.log(req.body);
}

function updateUserDB(user, params, res) {
  User.findByIdAndUpdate({ _id: params.id }, user, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del sevidorrrr." });
    } else {
      if (!userUpdate) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun usuario." });
      } else {
        res.status(200).send({ message: "Usuario actualizado correctamente." });
      }
    }
  });
} */

module.exports = {
  addMeteoDates,
  //signIn,
  getMeteoDates,
  //getUsersActive,
  //uploadAvatar,
  //getAvatar,
  //updateUser,
};
