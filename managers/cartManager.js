const Cart = require('../models/Cart.js');

class CartManager {
  async createCart(userId, products) {
    const newCart = new Cart({ userId, products });
    return await newCart.save();
  }

  async getCartByUserId(userId) {
    return await Cart.findOne({ userId }).populate('products.productId');
  }

  async updateCart(userId, products) {
    return await Cart.findOneAndUpdate(
      { userId },
      { products },
      { new: true }
    );
  }

  async deleteCart(userId) {
    return await Cart.findOneAndDelete({ userId });
  }
}

module.exports = new CartManager();
