import express from 'express';
import bodyParser from 'body-parser';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();


// Middleware
app.use(bodyParser.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar servidor
app.listen(8080, ()=>console.log('Server ok en puerto 8080'));  
