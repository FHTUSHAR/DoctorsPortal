import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ManageDoctors = () => {
    const { data: doctors = [], refetch, isLoading } = useQuery({
        queryKey: ['doctor'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-lime-nu.vercel.app/doctors', {
                    headers: {
                        authozization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = res.json()
                return data;
            }
            catch (e) {
                console.log(e)
            }
        }
    })
    const handleDelete = _id => {
        const doctordelete = window.confirm('do you want to delete this items')
        if (doctordelete) {
            const url = `https://doctors-portal-server-lime-nu.vercel.app/doctors/${_id}`
            fetch(url, {
                method: 'DELETE',
                headers: {
                    authozization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    refetch()
                })
        }

    }
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <div>
                <h2 className='text-3xl mb-5'>Manage Doctors</h2>
                {/* <h2>{formate,'PP'}</h2> */}
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) =>
                                <tr key={doctor._id}>
                                    <th>{i += 1}</th>
                                    <td><img className='w-16 rounded-full' src={doctor.image} alt="" /></td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.speciality}</td>
                                    <td><button onClick={() => handleDelete(doctor._id)} className='btn btn-error btn-xs'>DELETE</button></td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;