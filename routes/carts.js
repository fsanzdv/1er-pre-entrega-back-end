import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const router = Router();
const cartsFile = join(process.cwd(), 'carts.json');
const productsFile = join(process.cwd(), 'products.json');


const readFile = (file) => JSON.parse(readFileSync(file, 'utf-8'));
const writeFile = (file, data) => writeFileSync(file, JSON.stringify(data, null, 2));


router.post('/', (req, res) => {
    const carts = readFile(cartsFile);
    const newCart = {
        id: (carts.length + 1).toString(),
        products: []
    };
    carts.push(newCart);
    writeFile(cartsFile, carts);
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const carts = readFile(cartsFile);
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const carts = readFile(cartsFile);
    const products = readFile(productsFile);

    const cart = carts.find(c => c.id === cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productExists = products.some(p => p.id === pid);
    if (!productExists) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productInCart = cart.products.find(p => p.product === pid);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    writeFile(cartsFile, carts);
    res.status(201).json(cart);
});

export default router;
