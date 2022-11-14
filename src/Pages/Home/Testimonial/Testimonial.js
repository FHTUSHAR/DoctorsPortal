import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import PeopleReviews from '../PeopleReviews/PeopleReviews';

const Testimonial = () => {
    const reviews = [
        {
            id: '1',
            name: 'winson Herry',
            img: people1,
            reviews: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California'
        },
        {
            id: '2',
            name: 'winson Herry',
            img: people2,
            reviews: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California'
        },
        {
            id: '3',
            name: 'winson Herry',
            img: people3,
            reviews: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            location: 'California'
        },
    ]
    return (
        <div>
            <div className=" flex justify-between">
                <div className="card-body">
                    <h2 className="card-title text-success">Testimonial</h2>
                    <p className=' text-4xl'>What Our Patients Says</p>
                </div>
                <figure className=''><img className='w-24 lg:w-48' src={quote} alt="Shoes" /></figure>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-5'>
                {
                    reviews.map(review => <PeopleReviews key={review.id} review={review}></PeopleReviews>)
                }
            </div>

        </div>
    );
};

export default Testimonial;