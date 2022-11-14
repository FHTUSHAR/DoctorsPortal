import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'
import InfoCard from '../InfoCard/InfoCard';

const InfoCards = () => {
    const cardsInfo = [
        {
            id: "1",
            name: 'Opening Hour',
            details: 'Opening from 10.00 AM to 05.00PM on Friday',
            icon: clock,
            bgcolor: 'bg-success'
        },
        {
            id: "2",
            name: 'Visit our location',
            details: 'SR plaza,Saidpur,Nilphamary',
            icon: marker,
            bgcolor: 'bg-slate-600'
        },
        {
            id: "3",
            name: 'Contact us now',
            details: '017xxxxxxxx',
            icon: phone,
            bgcolor: 'bg-success'
        }
    ]
    return (
        <div>
            <div className='text-center '>
                <h1 className='text-2xl font-bold text-success'>OUR SERVICES</h1>
                <h2 className='text-4xl font-semibold mb-3'>Services We Provide</h2>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-5'>

                {
                    cardsInfo.map(info => <InfoCard key={info.id} info={info}></InfoCard>)
                }
            </div>
        </div>





    );
};

export default InfoCards;