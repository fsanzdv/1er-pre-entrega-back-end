const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(fileName) {
        this.filePath = path.join(__dirname, fileName);
        // Crear el archivo si no existe
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    }


    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los productos:', error);
            return [];
        }
    }


    async addProduct(product) {
        try {
            const products = await this.getProducts();
            product.id = products.length ? products[products.length - 1].id + 1 : 1;
            products.push(product);
            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
            return product;
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === id) || null;
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
        }
    }

    async updateProduct(id, updatedData) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex === -1) {
                throw new Error('Producto no encontrado');
            }
            products[productIndex] = { ...products[productIndex], ...updatedData };
            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
            return products[productIndex];
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    }


    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const filteredProducts = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.filePath, JSON.stringify(filteredProducts, null, 2));
            return true;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return false;
        }
    }
}

module.exports = ProductManager;
