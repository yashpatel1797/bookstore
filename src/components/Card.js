import React, { useCallback } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "context"
import { updateCart, deleteCart, getDiscount } from 'utilities';
import { ActionButtons } from 'components';

const Card = (props) => {
  const data = props.item
  const { isLogin, _id, cart, authDispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isInCart = location.pathname.includes('/cart');
  const isInOrder = location.pathname.includes('/order');
  const isItemInCart = cart.some((item) => item._id === data._id);

  const addToCartHandler = useCallback(() => {
    if (isLogin) {
      authDispatch({ type: 'ADD_TO_CART', payload: data });
      updateCart(data, _id);
      getDiscount(_id, authDispatch);
    } else {
      navigate('/login');
    }
  }, [isLogin, authDispatch, _id, data, navigate]);

  const removeFromCartHandler = useCallback(() => {
    if (isLogin) {
      authDispatch({ type: 'REMOVE_FROM_CART', payload: data });
      deleteCart(data._id, _id);
    } else {
      navigate('/login');
    }
  }, [isLogin, authDispatch, _id, data, navigate]);
  return (
    <div className='w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl'>
      <img
        src={data.image}
        alt={data.title}
        className='h-80 w-72 object-contain rounded-t-xl'
      />
      <div className="px-4 py-3 w-72">
        <p className='text-lg font-bold text-black truncate block capitalize'>{ data.title }</p>
        <span className='text-gray-400 mr-3 uppercase text-xs'>{ data.author }</span>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">{ data.price }</p>
          {/* {isInOrder ? (<></>) : ({isInCart ? (
            <button onClick={() => removeFromCartHandler()} className='ml-auto cursor-pointer py-1 px-1 block bg-indigo-500 text-white font-bold text-center rounded'>
              Remove from Cart
            </button>
          ) : isItemInCart ? (
            <Link to="/cart" className='ml-auto cursor-pointer py-1 px-1 block bg-indigo-500 text-white font-bold text-center rounded'>
              Go to Cart
            </Link>
          ) : (
            <button onClick={addToCartHandler} className='ml-auto cursor-pointer py-1 px-1 block bg-indigo-500 text-white font-bold text-center rounded'>
              Add to Cart
            </button>
          )})} */}
          <ActionButtons
            isInCart={isInCart} 
            isItemInCart={isItemInCart} 
            isInOrder={isInOrder} 
            addToCartHandler={addToCartHandler} 
            removeFromCartHandler={removeFromCartHandler} 
          />
        </div>
      </div>
    </div>
  )
}
export { Card }


