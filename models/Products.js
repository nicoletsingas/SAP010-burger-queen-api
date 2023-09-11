const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
    },
    details: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Products', productsSchema);