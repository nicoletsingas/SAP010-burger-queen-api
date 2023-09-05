require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const routes = require("./routes");
const pkg = require("./package.json");

const app = express();

// Open route - public route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vinda a minha API!" });
});

app.listen(3000);

/*const config = require("./config");
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/error");
;
 */

//const { port, dbUrl, secret } = config;

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)

//app.set("config", config);
//app.set("pkg", pkg);

/* parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});*/
