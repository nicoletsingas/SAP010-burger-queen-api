// implementar a logica relacionada a autenticação do usuario

const app = require('../index')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("..models/");
const secret = require("../config");

app.post("/login", async (req, res) => {
  console.log('chamou');
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const user = await User.findOne({ email: email });
    
    if (user) {
      return res.status(422).json({ msg: "This email already exists" });
    }

    if (!user) {
      return res.status(404).json({ msg: "Not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(404).json({ msg: "Not found" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = app;
