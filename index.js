require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const pkg = require('./package.json');
const config = require('./config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

const { port, dbUrl } = config;

app.set('config', config);
app.set('pkg', pkg);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(port, () => {
      console.info(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

module.exports = app;
