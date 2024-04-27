import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'



export default function ProtectedRoutes() {
    let  isLogin = window.sessionStorage.getItem("isLogin") == null ? false : true;
    return (
        <>
            {isLogin ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )

}