import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import CreateProfile from '../profile-forms/CreateProfile';
import ProfilePosts from '../profile/ProfilePosts';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getProfileById, filterByValue } from '../../actions/profile';
import { follow, unfollow } from '../../actions/profile';


const Profile = ({  getProfileById, follow, unfollow, auth: {user}, match,  profile: {profile, profiles, followerProfiles}, auth:{isAuthenticated}}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById ,match.params.id], followerProfiles);
    
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
        {profile  === null || user === null   && profile.followers === undefined ?  <Spinner /> : <Fragment>
            <div className='profile--top'>        


    <button onClick={e => triggerFollow(match.params.id)} disabled={!followState}>
        Follow
        </button>
        <button onClick={e => triggerUnfollow(match.params.id)} disabled={followState}>
        Unfollow
        </button>

           {filterByValue(profile.followers, user._id).map(item => <p>{item.user}</p>)}
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

                {/* <ProfilePosts /> */}
                {profile.followers.length < 0 ? 'This user has now followers' : <p>{profile.followers.length}</p>}

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