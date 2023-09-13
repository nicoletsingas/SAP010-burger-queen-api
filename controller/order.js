const Orders = require('../models/Orders');

const createOrder = async (req, res) => {
  try {
    const {
      client,
      userName,
      status,
      products,
    } = req.body;

    const order = new Orders({
      client,
      userName,
      status,
      products,
    });

    const newOrder = await order.save();

    res.status(201).json({ newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const {
      client,
      userName,
      status,
      products,
    } = req.body;

    const updateOrder = await Orders.findByIdAndUpdate(
      orderId,
      {
        client,
        userName,
        status,
        products,
      },
      { new: true },
    );

    if (!updateOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(201).json({ updateOrder });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrdersById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'order not found' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Orders.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'order not found' });
    }

    res.json({ msg: 'Success deleted order ' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
  getOrdersById,
  deleteOrder,
};
