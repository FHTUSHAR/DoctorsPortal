import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png'
import bgchair from '../../../assets/images/bg.png'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <div style={{
            backgroundImage: `url(${bgchair})`
        }}>
            <div className="hero min-h-screen  p-5">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className=' lg:w-1/2 mx-auto lg:mr-20 sm:w-2/3 '>
                        <img src={chair} className=" rounded-lg shadow-2xl   " />
                    </div>
                    <div className='lg:w-1/2  lg:ml-60'>
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}

                        />


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;