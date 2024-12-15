const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToDB() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");
        return client.db("my_database");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}

module.exports = connectToDB;
