const calculateTotalPrice = (cart) => cart.reduce((totalPrice, product) => {
  return Number(product.price) + Number(totalPrice)},0);

const calculateFinalPrice = (totalPrice, discount) => totalPrice * discount;
export { calculateTotalPrice, calculateFinalPrice }
