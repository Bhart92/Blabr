import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({ 
    profile: {
    user: { _id, name, avatar, handle },
    status, company, location, interests
    } 
}) => {
    return <div className='profiles-item'>
            <div className='profiles--item--title'>
                <img src={avatar} alt="" />
                <h2>{name}</h2>
                <span>{handle}</span>
            </div>
            <div>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <Link className='login--button' to={`/profile/${_id}`} >View Profile</Link>
            </div>
        </div>;
};

export default ProfileItem;