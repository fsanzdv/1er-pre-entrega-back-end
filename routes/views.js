import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const productos = await Product.find({});
    res.render('home', { productos });
});

router.get('/realtimeproducts', async (req, res) => {
    const productos = await Product.find({});
    res.render('realTimeProducts', { productos });
});

export default router;
