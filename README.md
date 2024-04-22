## Installation Setups

1. Clone the repository

```bash
  git clone https://github.com/yashpatel1797/bookstore.git
```
Navigate to projects
```bash
  cd express-backend
```
2. Run in-memory store
```bash
  node server.js
```
3. Steps to run frontend application
```bash
  cd bookstore
  npm install
  npm start
```
4. use this credential to login
```bash
  user1/password1
  user2/password2
  user3/password3
```

## Project Functionality

User Authentication
- Login using username and password.
- User session management using local storage.

Product Listing
- Display a list of books/products available in the bookstore.

Shopping Cart
- Add books to the cart.
- Remove books from the cart.
- Update the cart automatically on the server and local storage.

Discounts
- Automatic discount generation based on the number of orders.
- Apply discounts to the final price.

Order Placement
- Calculate the total price.
- Apply discounts.
- Place orders and store them in the user's order history.