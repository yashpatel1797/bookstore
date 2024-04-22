import React, { useReducer } from 'react'
import { loginFormReducer } from 'reducer'
import { useAuth } from 'context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [{ username, password }, loginDispatch] = useReducer(loginFormReducer, { username: "", password: "" })
  const { authDispatch } = useAuth();

  const submitHandler = async (e, username, password) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", { username, password });
      if (response.status === 200) {
        localStorage.setItem('isLoginStatus', true);
        localStorage.setItem('userData', JSON.stringify(response.data.user));

        authDispatch({ type: "USER_LOGIN" });
        authDispatch({ type: "USER_DATA_ADD", payload: response.data.user });

        navigate("/")
      }
    } catch (error) {
        console.error("Login failed:", error);
    }
  }
  return (
    <div className='flex items-center justify-center'>
    <div className='py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl'>
      <form onSubmit={(e) => submitHandler(e, username, password)}>
        <div className='mb-6'>
          <label htmlFor="username" className='block text-gray-800 font-bold'>Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            className='w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600'
            value={username}
            onChange={(e) => loginDispatch({ type: "SET_USERNAME", payload: e.target.value })}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor="password" className='block text-gray-800 font-bold'>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className='w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600'
            value={password}
            onChange={(e) => loginDispatch({ type: "SET_PASSWORD", payload: e.target.value })}
          />
        </div>
        <button type="submit" className='cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded'>Sign In</button>
      </form>
    </div>
  </div>
  )
}

export { Login }