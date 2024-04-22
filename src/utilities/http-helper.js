import axios from "axios";

const getRequestDataFromServer = async (url, dispatch) => {
    try {
      const { data } =  await axios.get(url)
      dispatch({ type: "FETCH_PRODUCTS_DATA", payload: data })
    } catch(error) {
      console.error("Error fetching data:", error);
    }
}

const updateLocalStorageCart = (cart) => {
  const dataToUpdate = JSON.parse(localStorage.getItem('userData')) || {};
  dataToUpdate.cart = cart;
  localStorage.setItem('userData', JSON.stringify(dataToUpdate));
};

const updateCart = async (data, userId) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/user/cart`, {
          id: userId,
          item: data
      })
      updateLocalStorageCart(res.data.cart);
    } catch(error) {
      console.log("Error updating cart:", error)
    }
}

const deleteCart = async (itemId, userId) => {
  try {
    const res = await axios.delete(`http://localhost:3000/api/user/cart`, {
      data: {
        id: userId,
        itemId: itemId
      }
    })
    updateLocalStorageCart(res.data.cart);
  } catch(error) {
    console.error("Error deleting item from cart:", error);
  }
}

const submitOrder = async (userId, cart, totalPrice, finalPrice) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/user/orders`, {
      userId,
      totalAmount: totalPrice,
      finalAmount: finalPrice,
      items: cart,
    })
    return res;
  } catch(error) {
    console.error("Error submitting order:", error);
  }
}

const getDiscount = async (userId, dispatch) => {
  try {
    const { data } = await axios.post(`http://localhost:3000/api/user/discount`, {
      userId: userId
    })
    dispatch({ type: "SET_DISCOUNT", payload: data.discountCoupon })
  } catch(error) {
    console.error("Error fetching discount:", error);
  }
}
export { getRequestDataFromServer, updateCart, deleteCart, submitOrder, getDiscount } 