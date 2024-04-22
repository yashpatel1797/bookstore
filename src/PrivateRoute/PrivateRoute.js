import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'context'
const PrivateRoute = () => {
    const { isLogin } = useAuth();
    return (
        (isLogin ? <Outlet /> : <Navigate to="/login" />)
    )
}
export { PrivateRoute }