import React, { useCallback } from 'react'
import { useAuth } from 'context'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { isLogin, username, authDispatch } = useAuth();

  const logoutHandler = useCallback(() => {
    authDispatch({ type: 'USER_LOGOUT' });
    authDispatch({ type: 'USER_DATA_REMOVE' });
    localStorage.clear();
  }, [authDispatch]);

  return (
    <>
    <nav className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
      <div className='flex-1 flex justify-between items-center'>
        <Link to="/">BookStore</Link>
      </div>
      <div className='hidden md:flex md:items-center md:w-auto w-full'>
        {!isLogin ?
          <Link to="/login">
            <span className='md:p-4 py-3 px-0 block'>{"Login"} </span>
          </Link> : 
          <>
          <span>  {username}</span>
          <Link
            to="/"
            onClick={logoutHandler}>
            <span className='md:p-4 py-3 px-0 block'>Logout</span>
          </Link>
          <Link to="/cart">
            <span className='md:p-4 py-3 px-0 block'>Cart </span></Link>
          </>
        }
      </div>
      </nav>
    </>
  )
}

export { Navbar }
