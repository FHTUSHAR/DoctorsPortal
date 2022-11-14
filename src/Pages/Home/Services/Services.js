import React from 'react';
import cavity from '../../../assets/images/cavity.png'
import fluoride from '../../../assets/images/fluoride.png'
import whitening from '../../../assets/images/whitening.png'
import Service from '../Service/Service';

const Services = () => {
    const services = [
        {
            id: '1',
            title: 'Fluoride Treatment',
            img: fluoride,
            details: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
        },
        {
            id: '2',
            title: 'Cavity Filling',
            img: cavity,
            details: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
        },
        {
            id: '3',
            title: 'Teeth Whitening',
            img: whitening,
            details: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
        },
    ]
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-5'>
            {
                services.map(service => <Service key={service.id} service={service}></Service>)
            }
        </div>
    );
};

export default Services;