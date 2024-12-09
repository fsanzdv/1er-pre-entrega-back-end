import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

const ProductMongo = mongoose.model('Product', productSchema);

module.exports = ProductMongo;
