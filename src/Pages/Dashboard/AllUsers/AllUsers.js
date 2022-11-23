import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

const AllUsers = () => {

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => fetch('https://doctors-portal-server-lime-nu.vercel.app/allusers')
            .then(res => res.json())
    })
    const handleAdmin = _id => {
        fetch(`https://doctors-portal-server-lime-nu.vercel.app/users/admin/${_id}`, {
            method: 'PUT',
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
    return (
        <div>
            <h2>Allusers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i += 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user?.role !== 'admin' && <button onClick={() => handleAdmin(user._id)} className='btn btn-xs btn-success'>Make Admin</button>}</td>
                                    <td><button className='btn btn-xs btn-error'>Delete</button></td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;