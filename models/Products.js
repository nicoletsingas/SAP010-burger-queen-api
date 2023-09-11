const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      allowNull: false,
      unique: true,
    },
    name: {
      type: String,
      allowNull: false,
    },
    price: {
      type: Number,
      allowNull: false,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      allowNull: false,
    },
    details: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Products', productsSchema);