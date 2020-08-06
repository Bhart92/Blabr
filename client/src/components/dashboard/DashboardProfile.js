import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from '../profile/ProfileTop';
import CreateProfile from '../profile-forms/CreateProfile';
import DashboardPosts from '../profile/DashboardPosts';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import ProfileFollowers from '../profile/ProfileFollowers';


const DashboardProfile = ({ getCurrentProfile,  user , profile: {profile, followerProfiles}, auth:{isAuthenticated}}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    // console.log(profile)
    return (
    <div>
        {profile === null  ?  <Spinner /> : <Fragment>
            <div className='profile--top'>
                <img src={user.avatar}></img>
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <span>@{user.handle}</span>
        <Link to={`/profile/${user._id}`} >View your Profile</Link>
            </div>

            <div className='profile--bottom'>
                <h1>Your Posts</h1>
                <DashboardPosts />
            </div>
            <div className='dashboard--profile--following'>
                <h2>Following</h2>
                <div className='dashboard--profile--following--container'>
                {followerProfiles === null || followerProfiles === undefined ? <Spinner /> : (
                <ProfileFollowers followerProfiles={followerProfiles} />

                )}
                </div>

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