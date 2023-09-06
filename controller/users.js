//  Lógica relacionada aos usuários, como cadastro, atualização, listagem e exclusão.

const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  console.log("chegou no createUser");
  try {
    const { id, email, password, role } = req.body;

    if (!id || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (id || email) {
      return res.status(422).json({ msg: "id or email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      id,
      email,
      password: passwordHash,
      role,
    });
    await newUser.save();

    newUser.password = undefined;

    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {};

const getUsers = async (req, res) => {};

const getUsersById = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = { createUser, updateUser, getUsers, getUsersById, deleteUser };
