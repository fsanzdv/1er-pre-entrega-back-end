import { Router } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = Router();


router.post('/', async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const product = await Product.findById(req.params.pid);

        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

        const itemIndex = cart.products.findIndex(p => p.product.equals(product._id));

        if (itemIndex !== -1) {
            cart.products[itemIndex].quantity += 1;
        } else {
            cart.products.push({ product: product._id, quantity: 1 });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
