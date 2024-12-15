const ProductManager = require('../managers/productManager');

exports.createProduct = async (req, res) => {
  try {
    const product = await ProductManager.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductManager.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
};
