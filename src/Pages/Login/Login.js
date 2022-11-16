import React, { useContext } from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const { createGoogleUser, signInUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('')
    console.log(error)
    const navigate = useNavigate()
    const handleLogin = data => {
        const { email, fpassword } = data;
        console.log(data)
        signInUser(email, fpassword)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate('/')
                setError('')
            })
            .catch(e => {
                console.error(e)
                setError(e.message)
            })
    }
    const handleGoogleBtn = () => {
        createGoogleUser()
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate('/')
            })
            .catch(e => {
                console.error(e)
                setError(e.message)
            })
    }
    return (
        <div className='flex justify-center items-center my-4 '>
            <div className='p-5 shadow-lg w-96'>
                <h2 className='text-center text-xl font-semibold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>


                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl">Email</span>
                        </label>
                        <input  {...register("email", { required: "Email address is required" })} aria-invalid={errors.email ? "true" : "false"} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text  text-xl">Password</span>
                        </label>
                        <input  {...register("fpassword", {
                            required: "Password is required",
                            pattern: { value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'Password must be strong' }
                        })} aria-invalid={errors.fpassword ? "true" : "false"} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.fpassword && <p className='text-red-600' role="alert">{errors.fpassword?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forgot password?</span>
                        </label>
                    </div>
                    {/* <p>{data}</p> */}
                    <input type="submit" value='Submit' className="input text-white input-bordered w-full max-w-xs mt-6 bg-slate-500" />
                    <p className='text-center'><small>New to Doctors Portal.<Link to={'/register'} className='text-primary'>Create new account</Link></small></p>
                    <h2 className='text-center font-semibold my-3'>OR</h2>

                </form>
                <button onClick={handleGoogleBtn} className=' btn btn-outline text-center  border-dark w-full max-w-xs  p-2 rounded-lg text-dark'>Continue with GOOGLE</button>
                <p>{error}</p>
            </div>
        </div>
    );
};

export default Login;