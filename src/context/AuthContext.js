import { createContext, useContext, useReducer } from "react";
import { authReducer } from "reducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('userData')) || ""
    const isLoginStatus = JSON.parse(localStorage.getItem('isLoginStatus')) || ""

    const [authState, authDispatch] = useReducer(authReducer, {
        isLogin: !!isLoginStatus,
        userDetails: userInfo
    })
    const { isLogin, userDetails: { username, email } } = authState
    return (<AuthContext.Provider value={{ isLogin, username, email, authDispatch }}>
        {children}
    </AuthContext.Provider>)
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }