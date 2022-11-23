import React, { useContext } from 'react';
import { Navigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const ErrorElement = () => {
    const { user, logOut } = useContext(AuthContext)
    const logOutBtn = () => {
        logOut()
            .then(() => {
                <Navigate to={'/login'}></Navigate>
            })
            .catch(e => console.log(e))
    }
    const error = useRouteError()
    return (
        <div>
            <h1 className='text-4xl text-error'>Something Went Wrong</h1>
            <h1 className='text-4xl text-error'>{error.status || error.message}</h1>
            <h3> Please <button onClick={logOutBtn} className='btn btn-primary text-white'>Log Out</button> and login again</h3>
        </div>
    );
};

export default ErrorElement;