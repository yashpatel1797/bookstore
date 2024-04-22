import { Card } from 'components';
import { useAuth } from 'context';
import React from 'react';

const Order = () => {
  const { order } = useAuth();
  return (
    <>
      <h1 className='text-center text-5xl font-extrabold dark:text-white'>Your Order has been placed successfully.</h1>
      <p className='text-center text-2xl font-extrabold dark:text-white'>Total Amount paid: {order[0].finalAmount}</p>
      <section className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 pl-20'>
        {order[0].items.map(item => <Card  item={item} key={item._id} />)}
      </section>
    </>
  )
}

export { Order }