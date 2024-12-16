const express = require('express');
const model = require('./model');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files for the View
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(model.getAllProducts());
});

// API endpoint to get a product by ID
app.get('/api/products/:id', (req, res) => {
    const product = model.getProductById(parseInt(req.params.id, 10));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// API endpoint to purchase a product
app.post('/api/products/:id/purchase', (req, res) => {
    const result = model.purchaseProduct(parseInt(req.params.id, 10));
    if (result.success) {
        res.json(result.product);
    } else {
        res.status(400).json({ error: result.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
