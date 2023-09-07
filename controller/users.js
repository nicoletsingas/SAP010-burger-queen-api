const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password, role } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { email, password, role },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ updateUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsersById = async (req, res) => {
  try {
    const userId = req.params.id;
    const findUser = await User.findById(userId);

    if (!findUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ findUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ msg: "Success deleted user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, updateUser, getUsers, getUsersById, deleteUser };
