import React from 'react';

const AppointmentOption = ({ option, setTreatment }) => {
    const { name, slots, price } = option;
    // console.log(option)
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="card-title text-center mx-auto">{name}</h2>

                <p>{
                    slots.length > 0 ? slots[0] : 'Try another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <h2>Price : ${price}</h2>
                <div className="card-actions">
                    <label htmlFor="booking-modal" disabled={slots.length == 0} onClick={() => setTreatment(option)} className="btn btn-success text-white mx-auto px-12">BOOK APPOINTMENT</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;