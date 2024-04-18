const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "USER_LOGIN":
      return { ...state, isLogin: true }
    case "USER_LOGOUT":
      return {
        ...state, isLogin: false,
        userDetails: ""
      }
    case "USER_DATA_ADD":
      return { ...state, userDetails: payload }
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
