// implementar a logica relacionada a autenticação do usuario

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('..models/');

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({msg: 'Bad request'});
  }
});
