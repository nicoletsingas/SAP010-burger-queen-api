const Products = require('../models/Products');

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      type,
      details,
    } = req.body;

    if (!name || !price || !type) {
      return res.status(400).json({ error: 'Fields name, price and type are required' });
    }

    const product = new Products({
      name,
      price,
      image,
      type,
      details,
    });

    const newProduct = await product.save();
    res.status(201).json({ newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      name,
      price,
      image,
      type,
      details,
    } = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        image,
        type,
        details,
      },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(201).json({ updateProduct });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductsById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ msg: 'Success deleted product' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProductsById,
  deleteProduct,
};
