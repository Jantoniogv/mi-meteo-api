const express = require("express");
const MeteoController = require("../../controllers/meteo");
//const multipart = require("connect-multiparty");

//const md_auth = require("../middleware/authenticated");
//const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });

const api = express.Router();

//api.post("/sing-up", UserController.signUp);
api.post("/add-meteo-dates", MeteoController.addMeteoDates);
api.get("/meteo-dates", MeteoController.getMeteoDates);
//api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);
/* api.put(
  "/upload-avatar/:id",
  [md_auth.ensureAuth, md_upload_avatar],
  UserController.uploadAvatar
); */
//api.get("/get-avatar/:avatarName", UserController.getAvatar);
//api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);

module.exports = api;
