import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppointmentOption from '../AppointmentOption/AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointment = ({ selectedDate, setSelectedDate }) => {
    const [appointmentOptions, setAppointmentOptions] = useState([])
    const [treatment, setTreatment] = useState(null)
    console.log(treatment)
    useEffect(() => {
        fetch('appointmentOption.json')
            .then(res => res.json())
            .then(data => setAppointmentOptions(data))
    }, [])
    return (
        <section className='mt-10'>
            <p className='text-center text-purple-400 font-bold my-8'>Available appointment {format(selectedDate, 'PP')} </p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5 px-5 '>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}
                    > </AppointmentOption>)
                }
            </div>
            {treatment &&
                <BookingModal treatment={treatment} selectedDate={selectedDate} setTreatment={setTreatment}></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;