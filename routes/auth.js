const express = require("express");
const AuthControllers = require("../controllers/auth");

const api = express.Router();

api.post("/refresh-access-token", AuthControllers.refreshAccessToken);

module.exports = api;
