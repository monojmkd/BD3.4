const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
let cors = require('cors');
app.use(cors());
app.use(express.static('static'));
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
// Endpoint 1
function addToCart(cart, productId, quantity, price, name) {
  cart.push({ productId, name, price, quantity });
  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let price = parseFloat(req.query.price);
  let name = req.query.name;
  let cartItems = addToCart(cart, productId, quantity, price, name);
  res.json(cartItems);
});
// Endpoint 2
function updateQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let cartItems = updateQuantity(cart, productId, quantity);
  res.json(cartItems);
});

// Endpoint 3
function deleteCartByProductId(cart, productId) {
  return cart.productId != productId;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let cartItems = cart.filter((cart) => deleteCartByProductId(cart, productId));
  res.json(cartItems);
});

// Endpoint 4
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Endpoint 5
function calculateTotalQuantity(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].quantity;
  }
  return sum;
}
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateTotalQuantity(cart);
  res.json({ totalQuantity });
});

// Endpoint 6
function calculateTotalPrice(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].price * cart[i].quantity;
  }
  return sum;
}
app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
