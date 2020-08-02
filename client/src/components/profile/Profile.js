import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import CreateProfile from '../profile-forms/CreateProfile';

import ProfilePosts from './ProfilePosts';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getProfileById, filterByValue } from '../../actions/profile';
import { follow, unfollow } from '../../actions/profile';
import { GET_POSTS } from '../../actions/types';


const Profile = ({  getProfileById, follow, unfollow, auth, match,  profile: {profile, profiles, followerProfiles}, auth:{isAuthenticated}}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById ,match.params.id]);
const triggerFollow = (id) => {
    follow(id)
    getProfileById(match.params.id);
}
const triggerUnfollow = (id) => {
    unfollow(id)
    getProfileById(match.params.id);

}
    return (
    <div className='profile--container'>
        {profile  === null ?  <Spinner /> : <Fragment>
            <div className='profile--top'>        
            <img src={profile.user.avatar} />
        <h1>{profile.firstName} {profile.lastName}</h1>
            {profile && 
            <Fragment>
                <div>
                {profile.followers.filter(follower => parseInt(follower.user) === parseInt(auth.user._id)).length ? <Fragment>
                    <button onClick={e => triggerUnfollow(match.params.id)} >
                            Unfollow
                    </button></Fragment>
                    :
                    <Fragment>
                    <button onClick={e => triggerFollow(match.params.id)}>
                        Follow
                    </button>
                    </Fragment>
                    }
                </div>
            </Fragment>
            }

            </div>
            <div className='profile--mid'>
                <p>{profile.bio}</p>
            </div>
            <div className='profile--bottom'>
            <h2>{profile.firstName}s posts</h2>
            <ProfilePosts />
            </div>

            <div className='dashboard--profile--following'>
            <h2>{profile.user.firstName}s followers</h2>
            <div className='dashboard--profile--following--container'>
                {followerProfiles.map(follower => {
                    return <div  className='dashboard--profile--following--container-user' key={follower._id}>
                        <img src={follower.avatar} />
                    <p>{follower.firstName}</p>
                </div>
            })}
            </div>


            </div>
            </Fragment>}
    </div>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileById, follow, unfollow })(Profile);