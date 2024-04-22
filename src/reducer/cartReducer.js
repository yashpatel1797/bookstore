export const cartReducer = (state, { type, payload }) => {
    switch (type) {
      case "FETCH_PRODUCTS_DATA":
        return { ...state, productsData: payload }
      default:
        return state;
    }
}