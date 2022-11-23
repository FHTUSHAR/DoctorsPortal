import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import { AuthContext } from '../../../context/AuthProvider'

const AdminRoute = ({ children }) => {
    let location = useLocation()
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)

    if (loading || isAdminLoading) {
        return <p className='flex justify-center'>Loading...</p>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};


export default AdminRoute; 