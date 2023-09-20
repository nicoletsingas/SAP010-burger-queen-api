require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

app.use(cors({
  origin: 'https://burguer-cooked.vercel.app',
  methods: 'GET,HEAD,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem-vinda a minha API!' });
});

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

app.use(authRoutes);
app.use(userRoutes);
app.use(productsRoutes);
app.use(ordersRoutes);

module.exports = app;
