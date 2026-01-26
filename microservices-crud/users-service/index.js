const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

let users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

// Create
app.post('/users', (req, res) => {
  const user = { id: uuidv4(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Read all
app.get('/users', (req, res) => res.json(users));

// Read one
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Update
app.put('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx] = { id: req.params.id, ...req.body };
  res.json(users[idx]);
});

// Delete
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== req.params.id);
  res.status(204).send();
});

app.listen(3001, () => console.log('Users service running on port 3001'));
