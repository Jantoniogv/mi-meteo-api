const Menu = require("../models/menu");

function addMenu(req, res) {
  //console.log("Add menu...");

  const { title, url, order, active } = req.body;

  const menu = new Menu();

  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;

  menu.save((err, createMenu) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!createMenu) {
        res.status(404).send({ message: "Error al crear el menu." });
      } else {
        res.status(200).send({ message: "Menu creado correctamente" });
      }
    }
  });
}

function getMenus(req, res) {
  Menu.find()
    .sort({ order: "asc" })
    .exec((err, menusStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor" });
      } else {
        if (!menusStored) {
          res.status(404).send({ message: "No se ha encontrado el menu." });
        } else {
          res.status(200).send({ menu: menusStored });
        }
      }
    });
}

module.exports = {
  addMenu,
  getMenus,
};