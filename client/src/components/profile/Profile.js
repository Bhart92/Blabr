import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import CreateProfile from '../profile-forms/CreateProfile';

import ProfilePosts from './ProfilePosts';
import ProfileFollowers from './ProfileFollowers';

import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getProfileById, filterByValue } from '../../actions/profile';
import { follow, unfollow } from '../../actions/profile';
import { GET_POSTS, AUTH_ERROR } from '../../actions/types';


const Profile = ({  getProfileById, follow, unfollow, auth, match,  profile: {profile, profiles, followerProfiles}, auth:{isAuthenticated}}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);

const [like, setLike] = useState(null);

if(auth.user && profile){
    console.log(profile.user._id);
    console.log(auth.user._id)
}
const triggerFollow = async (id) => {
    try {
        await follow(id)
        getProfileById(match.params.id);
    } catch (err) {
        console.log(err)
    }
    // console.log(followerState)
}
const triggerUnfollow = async (id) => {
    try {
        await unfollow(id);
        getProfileById(match.params.id)
    } catch (err) {
        console.log(err);
    }
}
    return !profile ? <Spinner /> : (
        <Fragment>
                <div className='profile--container'>
        {profile  === null ?  <Spinner /> : <Fragment>
            <div className='profile--top'>        
            <img src={profile.user.avatar} />
        <h1>{profile.firstName} {profile.lastName}</h1>
            {profile && auth && profile.user._id !== auth.user._id &&
            <Fragment>
                <div>

        { auth && !followerProfiles.filter(follower => follower.user == auth.user._id).length <= 0 ? (
                    <Fragment>
                    <button onClick={e => triggerUnfollow(match.params.id)} >
                            Unfollow
                    </button>
                    </Fragment>
                ) : (
                    <Fragment>

                    <button onClick={e => triggerFollow(match.params.id)} >
                        Follow
                    </button>

                    </Fragment>
                )}
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
            <ProfileFollowers followerProfiles={followerProfiles}/>
            </div>
            </Fragment>}
    </div>
        </Fragment>
    )
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