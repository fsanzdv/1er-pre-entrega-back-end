import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const router = Router();
const productsFile = join(process.cwd(), 'products.json');

const readFile = () => JSON.parse(readFileSync(productsFile, 'utf-8'));
const writeFile = (data) => writeFileSync(productsFile, JSON.stringify(data, null, 2));


router.get('/', (req, res) => {
    const products = readFile();
    const limit = parseInt(req.query.limit, 10);
    if (limit) {
        return res.json(products.slice(0, limit));
    }
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const products = readFile();
    const product = products.find(p => p.id === req.params.pid);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
    }

    const products = readFile();
    const newProduct = {
        id: (products.length + 1).toString(),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || []
    };
    products.push(newProduct);
    writeFile(products);
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const updates = req.body;
    const products = readFile();

    const index = products.findIndex(p => p.id === pid);
    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if ('id' in updates) {
        return res.status(400).json({ error: 'No se puede actualizar el ID' });
    }

    products[index] = { ...products[index], ...updates };
    writeFile(products);
    res.json(products[index]);
});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const products = readFile();

    const filteredProducts = products.filter(p => p.id !== pid);
    if (filteredProducts.length === products.length) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    writeFile(filteredProducts);
    res.status(204).send();
});

export default router;
