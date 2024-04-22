import { createContext, useContext, useReducer } from "react";
import { authReducer } from "reducer";

const defaultUserInfo = {
    _id: "",
    username: "",
    email: "",
    cart: [],
    order: [],
    orders: [],
    discount: [],
  };

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('userData')) || defaultUserInfo
    const isLoginStatus = JSON.parse(localStorage.getItem('isLoginStatus')) || ""

    const [authState, authDispatch] = useReducer(authReducer, {
        isLogin: !!isLoginStatus,
        userDetails: userInfo
    })

    const { isLogin, userDetails: { _id, username, email, cart, order, orders, discount } } = authState
    console.log(order);
    return (<AuthContext.Provider value={{ isLogin, _id, username, email, authDispatch, cart, order, orders, discount}}>
        {children}
    </AuthContext.Provider>)
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }