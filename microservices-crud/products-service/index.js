const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

// let products = [
//   { id: '1', name: 'Laptop' },
//   { id: '2', name: 'Phone' }
// ];

let products = [
  { id: '1', name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45, createdAt: '2023-01-10' },
  { id: '2', name: 'Desk Chair', category: 'Furniture', price: 249.99, stock: 120, createdAt: '2023-02-15' },
  { id: '3', name: 'Coffee Mug', category: 'Home', price: 12.99, stock: 500, createdAt: '2023-03-22' },
  { id: '4', name: 'Smartphone X', category: 'Electronics', price: 899.99, stock: 75, createdAt: '2023-04-18' },
  { id: '5', name: 'Notebook Set', category: 'Office', price: 24.99, stock: 300, createdAt: '2023-05-30' }
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
