const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

let products = [
  { id: '1', name: 'Laptop' },
  { id: '2', name: 'Phone' }
];

// Create
app.post('/products', (req, res) => {
  const product = { id: uuidv4(), ...req.body };
  products.push(product);
  res.status(201).json(product);
});

// Read all
app.get('/products', (req, res) => res.json(products));

// Read one
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Update
app.put('/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { id: req.params.id, ...req.body };
  res.json(products[idx]);
});

// Delete
app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

app.listen(3002, () => console.log('Products service running on port 3002'));
