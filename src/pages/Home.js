import React from 'react'
import { useCart } from "context"
import { Card } from "components"

const Home = () => {
  const { productsData } = useCart();
  return (
    <section className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>
      {productsData.map(product => (
        <Card item={ product } key={product._id} />
      ))}
    </section>
  )
}

export { Home }