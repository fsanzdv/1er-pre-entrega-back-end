const CartManager = require('../managers/cartManager');

exports.createCart = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const cart = await CartManager.createCart(userId, products);
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error creating cart', error: err });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await CartManager.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
};
