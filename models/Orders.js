const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
  {
    client: {
      type: String,
    },
    userName: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    products: [
      {
        name: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Orders', ordersSchema);
