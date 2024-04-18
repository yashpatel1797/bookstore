// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./db/users');
const products = require('./db/products')

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

// endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

//get user with ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);
  
  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

// Endpoint to get list of products
app.get('/api/products', (req, res) => {
    res.json(products);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
