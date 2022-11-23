import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(process.env.REACT_APP_stripeKey);

const Payment = () => {
    const booking = useLoaderData();
    // const navigation = useNavigation()
    // if (navigation.state === 'loading') {
    //     return <p className='flex justify-center'>Loading...</p>
    // }
    return (
        <div>
            <h1 className='text-3xl'>Payment for {booking.treatment}</h1>
            <h1 className='text-xl'>Please pay ${booking.price} for your appointment on {booking.selectedDate} at ( {booking.slot} )</h1>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking={booking}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;