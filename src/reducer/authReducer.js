const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "USER_LOGIN":
      return { ...state, isLogin: true }
    case "USER_LOGOUT":
      return { ...state, isLogin: false, userDetails: "" }
    case "USER_DATA_REMOVE":
      return { ...state, userDetails: {...state.userDetails, cart: []}};
    case "ADD_TO_CART":
      return { ...state, userDetails: {...state.userDetails, cart: [...state.userDetails.cart, payload ]}};
    case "USER_DATA_ADD":
      return { ...state, userDetails: payload }
    case "UPDATE_CART":
      return { ...state, userDetails: { ...state.userDetails, cart: payload } };
    case "REMOVE_FROM_CART":
      const updatedCart = state.userDetails.cart.filter(item => item._id !== payload._id);
      return { ...state, userDetails: { ...state.userDetails, cart: updatedCart } };
    case "FETCH_CART_DATA":
      return { ...state, userDetails:{...state.userDetails, cart: payload } }; 
    case "INITIAL_CART":
      return { ...state, userDetails: {...state.userDetails, cart: payload }};
    case "SET_DISCOUNT":
      return {...state, userDetails: {...state.userDetails, discount: payload } };
    case "ADD_ORDER":
      return { ...state, userDetails: {...state.userDetails, order: [payload] }}
    case "ADD_ORDERs":
      return { ...state, userDetails: {...state.userDetails, orders: payload }}
    default:
      return state
  }
}

const loginFormReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USERNAME":
      return { ...state, username: payload }
    case "SET_PASSWORD":
      return { ...state, password: payload }
    default:
        return state;
  }
}

export { authReducer, loginFormReducer }
