import React, { useEffect, useState } from 'react'
import { useAuth } from 'context'
import { Card } from 'components';
import { calculateTotalPrice, submitOrder } from 'utilities'
import { calculateFinalPrice } from 'utilities/calculation';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { _id, cart, discount, authDispatch } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cart));
  }, [cart]);

  useEffect(() => {
    setFinalPrice(calculateFinalPrice(totalPrice, 1));
  }, [totalPrice]);
  
  const orderHandler= async () => {
    const {data} =  await submitOrder(_id, cart, totalPrice, finalPrice);

    authDispatch({ type: "ADD_ORDERS", payload: data.orders });
    authDispatch({ type: "ADD_ORDER", payload: data.order });

    const dataToUpdate = JSON.parse(localStorage.getItem('userData'));
    dataToUpdate.order = [data.order];
    dataToUpdate.orders = data.orders;
    
    localStorage.setItem('userData', JSON.stringify(dataToUpdate))
    authDispatch({ type: "INITIAL_CART", payload: [] })
    navigate("/order")
  }

  const handleCouponChange = (e) => {
    const selected = e.target.value;
    if(selected === "discountOf10Percent")
      setFinalPrice(calculateFinalPrice(totalPrice, 0.9));

    if(selected === "discountOf20Percent")
      setFinalPrice(calculateFinalPrice(totalPrice, 0.8));
  };
  return (
    <div className='flex gap-10'>
      <section className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 pl-20'>
        {cart.length === 0 ? (
          <div className="text-center text-3xl">No item added to cart</div>
        ) : (
          cart.map(pro => <Card item={pro} key={pro._id} />)
        )}
      </section>

      <div className='mt-8'>
        <h1 className='text-5xl'>Price Details</h1>
        <div className='flex justify-between align-center my-5'>
          <p>Price( items)</p>
          <p>₹{(totalPrice).toFixed(2)}</p>
        </div>
        <div>
          {discount?.length === 0 ? <div>No Coupon available</div> :
            <>
            <p>Coupon Code</p>
              {discount?.map((coupon, index) => (
                <div key={index}>
                  <input 
                    type="radio" 
                    name="discount" 
                    id={index}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    value={coupon} 
                    onChange={handleCouponChange} />
                  <label htmlFor={index} className='ms-2'>{coupon}</label>
                </div>
              ))}
            </>
          }
        </div>
        <div className='flex justify-between align-center my-5'>
          <p>Total Amount</p>
          <p>₹{(finalPrice).toFixed(2)}</p>
        </div>
        {cart.length > 0 && (
          <button 
            onClick={orderHandler} 
            className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
          >
            Order
          </button>
        )}
      </div>
    </div>
  )
}

export { Cart }