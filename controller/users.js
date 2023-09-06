// implementar a logica relacionada a criação do usuario

const bcrypt = require("bcrypt");
const User = require("../models/User");
const salt = bcrypt.genSalt(12);
//const passwordHash = bcrypt.hash(password, salt);

/*const user = new User ({
  id,
  email,
  password: passwordHash,
  role
}) */


module.exports = {
  getUsers: (req, resp, next) => {
  }
};
