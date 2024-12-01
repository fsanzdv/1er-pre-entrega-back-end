import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import router from '../routes/products.js';
import cartsRouter from '../routes/carts.js';
import viewsRouter from '../routes/views.js';
import path from 'path';

const app = express();
const __dirname = path.resolve();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


const server = app.listen(8080, () => console.log('Server ok en puerto 8080'));
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('productoNuevo', (producto) => {
        io.emit('actualizarProductos', producto); 
    });
    socket.on('productoEliminado', (id) => {
        io.emit('eliminarProducto', id); 
    });
});

export { io };
