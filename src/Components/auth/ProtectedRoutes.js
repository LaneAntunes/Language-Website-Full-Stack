import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


function ProtectedRoutes({ isSignedIn }) {



    return (

        isSignedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes