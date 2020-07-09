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


const Profile = ({  getProfileById, follow, unfollow, auth: {user}, match,  profile: {profile, profiles, followerProfiles}, auth:{isAuthenticated}}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById ,match.params.id]);
    
const [followState, setFollowState] = useState(true);
const triggerFollow = (id) => {
    follow(id)
    setFollowState(false);
    getProfileById(match.params.id);
}
const triggerUnfollow = (id) => {
    unfollow(id)
    let old = followState;
    setFollowState(true);
    getProfileById(match.params.id);

}
    return (
    <div className='profile--container'>
        {profile  === null ?  <Spinner /> : <Fragment>
            <div className='profile--top'>        

            <img src={profile.user.avatar} />
        <h1>{profile.firstName} {profile.lastName}</h1>
    <button onClick={e => triggerFollow(match.params.id)} disabled={!followState}>
        Follow
        </button>
        <button onClick={e => triggerUnfollow(match.params.id)} disabled={followState}>
        Unfollow
        </button>

            </div>
            <div className='profile--mid'>
                <div className='profile--mid__interests'>

                </div>
                <p>{profile.bio}</p>
            </div>





            <div>
            <h2>{profile.firstName}s posts</h2>



            <ProfilePosts />




            </div>







            <div className='profile--bottom'>
            <h2>{profile.user.firstName}s followers</h2>
                {followerProfiles.map(follower => {
                    return <div key={follower._id}>
                        <img src={follower.avatar} />
                    <p>{follower.firstName}</p>
                </div>
            })}

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