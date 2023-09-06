//  Lógica relacionada aos usuários, como cadastro, atualização, listagem e exclusão.

const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
//const passwordHash = bcrypt.hash(password, salt);

const createUser = async (req, res) => {
  try {
    const { id, email, password, role } = req.body;
    const newUser = new User({
      id,
      email,
      password,
      role,
    });
    await newUser.save();
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
