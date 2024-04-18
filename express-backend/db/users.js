// users.js
const { v4: uuid } = require("uuid");
const users = [
  {
    _id: uuid(),
    username: 'user1',
    password: 'password1',
    email: 'user1@example.com',
  },
  {
    _id: uuid(),
    username: 'user2',
    password: 'password2',
    email: 'user2@example.com',
  },
  {
    _id: uuid(),
    username: 'user3',
    password: 'password3',
    email: 'user3@example.com',
  },
];
  
module.exports = users;
  