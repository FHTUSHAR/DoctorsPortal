import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';
const Register = () => {
    const { createUser, createGoogleUser, userProfile } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate()
    if (token) {
        navigate('/')
    }
    const handleRegister = data => {
        const { email, fpassword, name } = data;
        console.log(data)
        createUser(email, fpassword)
            .then(result => {
                const user = result.user;
                console.log(user)

                updateName(name)
                saveUserToDatabase(name, email)
                setError('')
            })
            .catch(e => {
                console.error(e)
                setError(e.message)
            })

    }
    const updateName = (name) => {
        const profile = {
            displayName: name,
        }
        userProfile(profile)
            .then(result => {
                setError('')
            })
            .catch(e => {
                console.error(e)
                setError(e.message)
            })
    }
    const saveUserToDatabase = (name, email) => {
        const savedUser = { name, email }
        fetch('https://doctors-portal-server-lime-nu.vercel.app/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(savedUser)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)


            })
            .catch(e => console.error(e))
    }
    // const getUserToken = email => {
    //     fetch(`https://doctors-portal-server-lime-nu.vercel.app/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.accessToken) {
    //                 navigate('/')
    //                 localStorage.setItem('accessToken', data.accessToken)
    //             }
    //         })
    // }

    const handleGoogleBtn = () => {
        createGoogleUser()
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
    return (
        <div className='flex justify-center items-center my-4 '>
            <div className='p-5 shadow-lg w-96'>
                <h2 className='text-center text-xl font-semibold'>Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl">Name</span>
                        </label>
                        <input  {...register("name", { required: "Name is required" })} type="text" aria-invalid={errors.name ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    </div>

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
                    <p className='text-center'><small>Have an account to Doctors Portal?<Link to={'/login'} className='text-primary'>Login</Link></small></p>
                    <h2 className='text-center font-semibold my-3'>OR</h2>
                </form>
                <button onClick={handleGoogleBtn} className=' btn btn-outline text-center  border-dark w-full max-w-xs  p-2 rounded-lg text-dark'>Continue with GOOGLE</button>
                <p>{error}</p>
            </div>
        </div>
    );
};

export default Register;