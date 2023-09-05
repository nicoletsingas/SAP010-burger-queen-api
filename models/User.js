const mongoose = require('mongoose');
const User = mongoose.model('User', {
  id: Number,
  email: String,
  password: String,
  role: String
})

module.exports = User;