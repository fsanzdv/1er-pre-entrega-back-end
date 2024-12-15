const Product = require('../models/Product.js');

class ProductManager {
  async createProduct(data) {
    const newProduct = new Product(data);
    return await newProduct.save();
  }

  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(productId) {
    return await Product.findById(productId);
  }

  async updateProduct(productId, data) {
    return await Product.findByIdAndUpdate(productId, data, { new: true });
  }

  async deleteProduct(productId) {
    return await Product.findByIdAndDelete(productId);
  }
}

module.exports = new ProductManager();
