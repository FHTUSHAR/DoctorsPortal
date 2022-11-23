import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'

const PrivateRoute = ({ children }) => {
    let location = useLocation()
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <p>Loading...</p>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
};


export default PrivateRoute; 