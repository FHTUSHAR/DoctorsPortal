import React from 'react';
import { format } from 'date-fns';
const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
    const date = format(selectedDate, 'PP')

    const handleBooking = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const phone = event.target.phone.value
        const slot = event.target.slot.value
        console.log(name, email, slot, phone)
        event.target.reset()
        const appointmentBooking = {
            selectedDate: date,
            treatment: treatment.name,
            patient: name,
            email,
            phone,
            slot
        }

        setTreatment(null)
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-semibol mb-16">{treatment?.name}</h3>
                    <p className="font-semibold bg-slate-300  px-4 py-2 rounded-lg mb-3"> {format(selectedDate, 'PP')}</p>

                    <form onSubmit={handleBooking}>
                        <select name='slot' className='font-semibold bg-slate-300  px-4 py-2 rounded-lg mb-3 w-full'>
                            {
                                treatment.slots.map(opt => <option value={opt}>{opt}</option>)
                            }
                        </select>
                        <input type="text" name='name' placeholder="Full Name" className="input input-bordered w-full  mb-3" />
                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full  mb-3" />
                        <input type="text" name='email' placeholder="Email" className="input input-bordered w-full  mb-3" />
                        <input type="submit" value="SUBMIT" className="input input-bordered w-full font-bold  mb-3 text-white bg-slate-600" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;