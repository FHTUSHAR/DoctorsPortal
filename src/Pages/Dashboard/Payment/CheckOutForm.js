import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckOutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const { price, patient, email, _id } = booking


    useEffect(() => {
        fetch('https://doctors-portal-server-lime-nu.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authozization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret)
                console.log(data)
            })
    }, [price])
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log(error)
            setCardError(error.message)
        } else {
            setCardError('')

        }

        setSuccess('')
        const { paymentIntent, error: consfirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );

        if (consfirmError) {
            setCardError(consfirmError.message)
            return
        }
        if (paymentIntent.status === 'succeeded') {
            setSuccess('Congratulation ! your payment has been successful')
            setTransactionId(paymentIntent.id)
            const payment = {
                price,
                patient,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch('https://doctors-portal-server-lime-nu.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authozization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment),
            })
                .then(res => res.json())
                .then(data => {
                    setSuccess('Congratulation ! your payment has been successful')
                    setTransactionId(paymentIntent.id)
                })
            console.log(paymentIntent)
        }
        setProcessing(true)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-5 px-6 py-0 btn-sm' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-400'>{success}</p>
                    <p>Your transaction Id:<span className='font-bold'> {transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckOutForm;