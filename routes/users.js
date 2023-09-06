const express = require("express");
const router = express.Router();
const { requireAuth, requireAdmin } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const {
  createUser,
  updateUser,
  getUsers,
  getUsersById,
  deleteUser,
} = require("../controller/users");

router.post('/users', createUser);

router.patch('/users/:id', updateUser);

router.get('/users', getUsers);

router.get('/users/:id', getUsersById);

router.delete('/users/:id', deleteUser);

/*
const initAdminUser = (app, next) => {
  const { adminEmail, adminPassword } = app.get("config");
  if (!adminEmail || !adminPassword) {
    return next();
  }
  
  const adminUser = {
    email: adminEmail,
    password: bcrypt.hashSync(adminPassword, 10),
    roles: { admin: true },
  };

  // TODO: crear usuaria admin
  next();
}; */

module.exports = router;

