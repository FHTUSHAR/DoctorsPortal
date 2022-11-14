import React from 'react';
import chair from '../../../assets/images/chair.png'
import './Banner.css'

const Banner = () => {
    return (
        <div className="hero min-h-screen banner p-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='w-1/2 mx-auto '>
                    <img src={chair} className=" rounded-lg shadow-2xl w-2/3 ml-9" />
                </div>
                <div className='w-1/2 ml-9'>
                    <h1 className="text-4xl font-bold">Your New Smile Starts<br></br> Here</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-accent text-white">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;