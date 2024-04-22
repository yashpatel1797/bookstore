// users.js
const { v4: uuid } = require("uuid");
const users = [
  {
    _id: 1,
    username: 'user1',
    password: 'password1',
    email: 'user1@example.com',
    cart: [],
    orders: [],
    order: [],
  },
  {
    _id: 2,
    username: 'user2',
    password: 'password2',
    email: 'user2@example.com',
    cart: [],
    orders: [],
    order: [],
  },
  {
    _id: 3,
    username: 'user3',
    password: 'password3',
    email: 'user3@example.com',
    cart: [],
    orders: [],
    order: [],
  },
];
  
module.exports = users;
  