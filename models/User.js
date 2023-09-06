const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      allowNull: false,
      unique: true,
    },
    email: {
      type: String,
      allowNull: false,
      unique: true,
    },
    password: {
      type: String,
      allowNull: false,
    },
    role: {
      type: String,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

