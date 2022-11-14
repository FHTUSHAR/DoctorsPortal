import React from 'react';

const PeopleReviews = ({ review }) => {
    const { reviews, img, name, location } = review;
    return (
        <div className="card w-96 bg-base-100 shadow-xl p-4">
            <div className="card-body">
                <p>{reviews}</p>
            </div>
            <div className='flex'>
                <figure className='ml-6 mr-4'><img src={img} alt='' /></figure>
                <div className='mt-4'>
                    <h3 className='font-semibold'>{name}</h3>
                    <h3>{location}</h3>
                </div>
            </div>
        </div>
    );
};

export default PeopleReviews;