import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const imageHostingKey = process.env.REACT_APP_imgbb_key
    const url = 'https://doctors-portal-server-lime-nu.vercel.app/apointmentSpeciality'
    const { data: specialities = [], isLoading, refetch } = useQuery({
        queryKey: ['apointmentSpeciality'],
        queryFn: async () => fetch(url)
            .then(res => res.json())
    })

    const handleAddDoctor = data => {
        const image = data.img[0]
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((imgData) => {
                console.log(imgData)
                if (imgData.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.selectOption,
                        image: imgData.data.url
                    }
                    console.log(doctor)
                    fetch('https://doctors-portal-server-lime-nu.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authozization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success('Doctor added')
                                navigate('/dashboard/manageDoctors')
                            }
                        })
                        .catch(e => console.error(e))
                }


            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }
    return (
        <div>
            <h1 className='text-3xl'>Add Doctor</h1>
            <div className='flex justify-center '>
                <form className='w-96' onSubmit={handleSubmit(handleAddDoctor)}>
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
                            <span className="label-text  text-xl">Speciality</span>
                        </label>
                        <select  {...register("selectOption", { required: "selectOption address is required" })}
                            className="select select-accent w-full max-w-xs">
                            <option disabled selected>Please select a speciality </option>
                            {
                                specialities.map(speciality => <option key={speciality._id}
                                    value={speciality.name}
                                > {speciality.name}</option>)
                            }

                        </select>


                    </div>
                    <div className=''>
                        <label className="label">
                            <span className="label-text text-xl">Photo</span>
                        </label>
                        <input  {...register("img", { required: "Image is required" })} type="file" aria-invalid={errors.name ? "true" : "false"} placeholder="Type here" className="input input-bordered w-full h-20 pt-5 max-w-xs" />
                        {errors.img && <p className='text-red-600' role="alert">{errors.img?.message}</p>}
                    </div>
                    <input type="submit" value='ADD' className="input text-white input-bordered w-full max-w-xs mt-6 bg-slate-500" />
                </form>
            </div>

        </div>
    );
};

export default AddDoctor;