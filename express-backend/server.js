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

// Endpoint to get list of cart
app.get('/api/cart', (req, res) => {
  const { id }  = req.query;
  const user = users.find(u => u._id === id);
  const cart = user ? user.cart : null;

  if(cart) {
    res.json({ success: true, cart });
  } else {
    res.json({ success: false, message: "cart not found."})
  }
});

app.post('/api/user/cart', (req, res) => {
  try {
    const { id, item } = req.body;
    const userIndex = users.findIndex(u => u._id === id);
    if (userIndex !== -1) {
      const cart = users[userIndex].cart || [];
      cart.push(item);
      users[userIndex].cart = cart;
      res.json({ success: true, cart });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.delete('/api/user/cart', (req, res) => {
  try {
    const { id, itemId } = req.body;
    const userIndex = users.findIndex(u => u._id === id);

    if (userIndex !== -1) {
      const cart = users[userIndex].cart || [];
      const item = cart.filter((item) => item._id !== itemId);
      cart.pop(item);
      users[userIndex].cart = cart;
      res.json({ success: true, cart });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

app.post('/api/user/orders', (req, res) => {
  const { userId, items, totalAmount, finalAmount } = req.body;

  if (!userId || !items || !totalAmount || !finalAmount) {
      return res.status(400).json({ success: false, message: 'Incomplete order details' });
  }
  const userIndex = users.findIndex(u => u._id === userId);
  const orders = users[userIndex].orders || [];

  const newOrder = {
      orderId: Date.now().toString(), 
      userId,
      items,
      totalAmount,
      finalAmount,
  };
  orders.push(newOrder);
  res.json({ success: true, message: 'Order added successfully', order: newOrder, orders});
});

app.post('/api/user/discount', (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'Incomplete order details' });
  }
  const user = users.find(u => u._id === userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const ordersCount = user.orders ? user.orders.length : 0;
  let discountCoupon = [];
  if (ordersCount !== 0 && ordersCount % 3 === 0) {
    discountCoupon.push('discountOf10Percent');
  }
  if (ordersCount !== 0 && ordersCount % 3 === 0 && ordersCount % 2 === 0) {
    discountCoupon.push('discountOf20Percent');
  }
  res.json({ success: true, discountCoupon });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
