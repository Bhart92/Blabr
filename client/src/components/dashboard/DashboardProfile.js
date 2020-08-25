import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from '../profile/ProfileTop';
import CreateProfile from '../profile-forms/CreateProfile';
import DashboardPosts from './DashboardPosts';
import Spinner from '../layout/Spinner';
import ProfileFollowers from '../profile/ProfileFollowers';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardProfile = ({ getPosts, getCurrentProfile,  post, user , profile: {profile, followerProfiles}}) => {
 
    return (
    <div className='profile--top-container'>
        {profile === null  ?  <Spinner /> : <Fragment>
            <div className='profile--top'>
                <img src={user.avatar}></img>
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <span>@{user.handle}</span>
        <Link to={`/profile/${user._id}`} >View your Profile</Link>
            </div>

            <div className='profile--bottom'>
                <h2>Your Posts</h2>
                <DashboardPosts post={post}/>
            </div>
            <div className='dashboard--profile-following--container'>
                <h2>Following</h2>
                <div className='dashboard--profile-following'>
                {followerProfiles === null || followerProfiles === undefined ? <Spinner /> : (
                <ProfileFollowers followerProfiles={followerProfiles} />
                )}
                </div>
            </div>
            </Fragment>
            }
    </div>
    );
};

DashboardProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile
});

export default connect(mapStateToProps)(DashboardProfile);