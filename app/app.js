const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'mydb';

// Products Collection
let productsCollection;

async function connect() {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    productsCollection = db.collection('products');
}

async function dropCollection() {
    await productsCollection.drop().catch(err => {
        if (err.codeName !== 'NamespaceNotFound') {
            console.error('Failed to drop collection:', err);
        }
    });
}

async function init() {
    await connect();
    await dropCollection();
}

init().catch(console.error);
