require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const pkg = require("./package.json");
const config = require("./config");
const adminEmail = require("./config");
const adminPassword = require("./config");
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/error");

const { port, dbUrl, secret } = config;

app.set("config", config);
app.set("pkg", pkg);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Teste - Open route - public route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vinda a minha API!" });
});

mongoose
.connect(dbUrl)
.then(() => {
  app.listen(port, () => {
    console.log("conectou ao banco");
  });
})
.catch((err) => {
  console.log(err);
});

routes(app, (err) => {
  if (err) {
    throw err;
  }
  app.use(errorHandler);

});

