import React from 'react';
import { Link } from 'react-router-dom';

const CartButton = ({ onClick }) => (
  <button onClick={onClick} className='ml-auto cursor-pointer py-1 px-1 block bg-indigo-500 text-white font-bold text-center rounded'>
    Remove from Cart
  </button>
);

const CartLink = () => (
  <Link to="/cart" className='ml-auto cursor-pointer py-1 px-1 block bg-indigo-500 text-white font-bold text-center rounded'>
    Go to Cart
  </Link>
);

const AddToCartButton = ({ onClick }) => (
  <button onClick={onClick} className='ml-auto cursor-pointer py-1 px-1 block bg-indigo-500 text-white font-bold text-center rounded'>
    Add to Cart
  </button>
);

const ActionButtons = ({ isInCart, isItemInCart, isInOrder, addToCartHandler, removeFromCartHandler }) => {
  if (isInOrder) {
    return null;
  }

  if (isInCart) {
    return <CartButton onClick={removeFromCartHandler} />;
  }

  if (isItemInCart) {
    return <CartLink />;
  }

  return <AddToCartButton onClick={addToCartHandler} />;
};

export { ActionButtons };
