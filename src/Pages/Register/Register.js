import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
const Register = () => {
    const { createUser, createGoogleUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const handleRegister = data => {
        const { email, fpassword } = data;
        console.log(data)
        createUser(email, fpassword)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate('/')
            })
            .catch(e => {
                console.error(e)
                navigate('/register')
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
                navigate('/register')
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
            </div>
        </div>
    );
};

export default Register;