const express = require('express');
const router = express.Router();
const ProductManager = require('../models/productManager.js');

const productManager = new ProductManager('../server/products.json');


router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const product = await productManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});


router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productManager.addProduct(newProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'Datos inválidos', details: error.errors });
        } else {
            res.status(500).json({ error: 'Error al agregar el producto' });
        }
    }
});



router.put('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const updatedData = req.body;
        const updatedProduct = await productManager.updateProduct(productId, updatedData);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const success = await productManager.deleteProduct(productId);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;
