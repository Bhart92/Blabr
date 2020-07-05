import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from '../profile/ProfileTop';
import CreateProfile from '../profile-forms/CreateProfile';
import ProfilePosts from '../profile/ProfilePosts';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const DashboardProfile = ({ getCurrentProfile,  user , profile: {profile}, auth:{isAuthenticated}}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    // console.log(profile)
    return (
    <div className='profile--container'>
        {profile === null  ?  <Spinner /> : <Fragment>
            <div className='profile--top'>
                <img src={user.avatar}></img>
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <span>{user.handle}</span>
            </div>
            <div className='profile--mid'>
                <div className='profile--mid__interests'>
                <ul>
                    {profile.interests.map((item, i) => {
                        return <li key={i}>
                            {item}
                        </li>
                    })}
                </ul>
                </div>

                <p>{profile.bio}</p>
            </div>
            <div className='profile--bottom'>
                <ProfilePosts />
            </div>
            </Fragment>}
    </div>
    );
};

DashboardProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(DashboardProfile);