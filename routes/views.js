import express from 'express';


const router = express.Router();


router.get('/', async (req, res) => {
    const productos = await getProductos();
    res.render('home', { productos });
});


router.get('/realtimeproducts', async (req, res) => {
    const productos = await getProductos();
    res.render('realTimeProducts', { productos });
});

export default router;
