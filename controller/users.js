const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: passwordHash,
      role,
    });
    await newUser.save();

    newUser.password = undefined;

    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, password, role },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUsersById = async (req, res) => {
  try {
    const userId = req.params.id;
    const findUser = await User.findById(userId).select('-password');

    if (!findUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ findUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ msg: 'Success deleted user' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getUsersById,
  deleteUser,
};
