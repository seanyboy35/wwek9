const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');

// Create an Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mydb';
let productsCollection;

// Connect to MongoDB
async function connect() {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    productsCollection = db.collection('products');
}

// Route to get all products
app.get('/products', async (req, res) => {
    try {
        const products = await productsCollection.find({}).toArray();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to add a new product
app.post('/products', async (req, res) => {
    const newProduct = req.body;
    const existingProduct = await productsCollection.findOne({ id: newProduct.id });

    if (existingProduct) {
        return res.status(400).send('Product with this ID already exists.');
    }

    try {
        await productsCollection.insertOne(newProduct);
        res.status(201).send('Product added successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to remove a product by ID
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await productsCollection.deleteOne({ _id: ObjectID(productId) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Product not found.');
        }
        res.send('Product deleted successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to update a product
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    try {
        const result = await productsCollection.updateOne(
            { _id: ObjectID(productId) },
            { $set: updatedProduct }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send('Product not found.');
        }
        res.send('Product updated successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch(console.error);
