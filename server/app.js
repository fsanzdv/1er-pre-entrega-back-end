require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());


connectDB();


const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
app.use('/api', cartRoutes);
app.use('/api', productRoutes);

const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
