import React from 'react';

const InfoCard = ({ info }) => {
    const { id, name, details, icon, bgcolor } = info;
    return (

        <div className={`card card-side bg-base-100 shadow-2xl ${bgcolor} p-3 text-white`}>
            <figure><img className='' src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{details}</p>
            </div>
        </div>

    );
};

export default InfoCard;