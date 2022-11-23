import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../context/AuthProvider';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { Link } from 'react-router-dom';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);
    const url = `https://doctors-portal-server-lime-nu.vercel.app/bookings?email=${user?.email}`
    const { data: myBookingsAppointment = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => fetch(url, {
            headers: {
                authozization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    })

    return (
        <div>
            <div>
                <h2 className='text-3xl mb-5'>My Appointment</h2>
                {/* <h2>{formate,'PP'}</h2> */}
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            myBookingsAppointment.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th>{i += 1}</th>
                                    <td>{booking.patient}</td>
                                    <td>{booking.treatment}</td>
                                    <td>{booking.selectedDate}</td>
                                    <td>{booking.slot}</td>
                                    <td>
                                        {booking.price && !booking.paid && <>
                                            <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary btn-sm'>PAY</button></Link></>}
                                        {
                                            booking.price && booking.paid && <span className='text-green-300'> Paid</span>
                                        }
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;