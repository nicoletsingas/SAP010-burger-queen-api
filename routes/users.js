const express = require("express");
const router = express.Router();
const { requiredAuth, isAdmin } = require("../middleware/auth");

const {
  createUser,
  updateUser,
  getUsers,
  getUsersById,
  deleteUser,
} = require("../controller/users");

router.post('/users', requiredAuth, isAdmin, createUser);
router.patch('/users/:id', requiredAuth, isAdmin, updateUser);
router.get('/users', requiredAuth, isAdmin, getUsers);
router.get('/users/:id', requiredAuth, getUsersById);
router.delete('/users/:id', requiredAuth, isAdmin, deleteUser);

module.exports = router;

