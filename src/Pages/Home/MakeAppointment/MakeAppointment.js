import React from 'react';
import doc from '../../../assets/images/doctor-small.png'
import './MakeAppointment.css'

const MakeAppointment = () => {
    return (
        <section className='mt-16 doc-section'>
            <div className="lg:ml-9 hero min-h-screen lg:px-10 doc ">
                <div className="hero-content  flex-col lg:flex-row">
                    <img src={doc} className="-mt-44 lg:block hidden rounded-lg " />
                    <div className='text-white'>
                        <h3>Appointment</h3>
                        <h1 className="text-3xl font-bold">Make an appointment Today</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <button className="btn btn-success text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;