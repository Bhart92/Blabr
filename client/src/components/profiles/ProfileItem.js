import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({ 
    profile: {
    user: { _id, name, avatar, handle },
    status, company, location, interests
    } 
}) => {
    return <Fragment>
        <img src={avatar} alt="" />
        <div>
            <h2>{name}</h2>
            <span>{handle}</span>
            <p>{status} {company && <span> at {company}</span>}</p>
            <p>{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} >View Profile</Link>
        </div>

    </Fragment>;
};




export default ProfileItem;