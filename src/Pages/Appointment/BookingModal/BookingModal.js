import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../context/AuthProvider';
const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const date = format(selectedDate, 'PP')
    const { name, price } = treatment;
    console.log(price)
    const { user } = useContext(AuthContext)
    console.log(user)
    const handleBooking = (event) => {
        event.preventDefault()
        const pname = event.target.pname.value
        const email = event.target.email.value
        const phone = event.target.phone.value
        const slot = event.target.slot.value
        // console.log(name, email, slot, phone)
        event.target.reset()
        const appointmentBooking = {
            selectedDate: date,
            treatment: name,
            patient: pname,
            email,
            phone,
            slot,
            price
        }
        fetch('https://doctors-portal-server-lime-nu.vercel.app/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointmentBooking)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    setTreatment(null)
                    alert('Booking successful')
                    refetch()
                }
                else {
                    alert(data.message)
                    setTreatment(null)
                }

            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-semibol mb-16">{name}</h3>
                    <p className="font-semibold bg-slate-300  px-4 py-2 rounded-lg mb-3"> {format(selectedDate, 'PP')}</p>

                    <form onSubmit={handleBooking}>
                        <select name='slot' className='font-semibold bg-slate-300  px-4 py-2 rounded-lg mb-3 w-full'>
                            {
                                treatment.slots.map(opt => <option value={opt}>{opt}</option>)
                            }
                        </select>
                        <input type="text" name='pname' defaultValue={user?.displayName} readOnly placeholder="Full Name" className="input input-bordered w-full  mb-3" />
                        <input type="text" name='email' defaultValue={user?.email} readOnly placeholder="Email" className="input input-bordered w-full  mb-3" />
                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full  mb-3" />
                        <input type="submit" value="SUBMIT" className="input input-bordered w-full font-bold  mb-3 text-white bg-slate-600" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;