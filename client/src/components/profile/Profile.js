import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfilePosts from './ProfilePosts';
import ProfileFollowers from './ProfileFollowers';
import Spinner from '../layout/Spinner';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { follow, unfollow, getProfileById } from '../../actions/profile';

const Profile = ({  getProfileById, follow, unfollow, auth, match,  post, profile: {profile, social , profiles, followerProfiles}, auth:{isAuthenticated}}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);
    const [like, setLike] = useState(null);
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
    if(!isAuthenticated){
        return <Redirect to='/' />;
    }
    return !profile ? <Spinner /> : (
        <Fragment>
            <div className='profile--container'>
                {!profile  ?  (<Fragment><Spinner /></Fragment>) : <Fragment>
                    <div className='profile--top'>        
                        <img src={profile.user.avatar} />
                        <h1>{profile.firstName} {profile.lastName}</h1>
                        <span>@{profile.user.handle}</span>
                        <div className='profile--top--social-icons'>
                            {profile && profile.social !== undefined && (
                                <Fragment>
                                    <a href={profile.social.twitter}><i className='fab fa-twitter'></i></a>
                                    <a href={profile.social.facebook}><i className='fab fa-facebook'></i></a>
                                    <a href={profile.social.youtube}><i className='fab fa-youtube'></i></a>
                                    <a href={profile.social.instagram}><i className='fab fa-instagram'></i></a>
                                </Fragment>
                            )} 
                        </div>
                        {profile && auth && profile.user._id !== auth.user._id &&
                            <Fragment>
                                <div>
                                    {auth && !followerProfiles.filter(follower => follower.user == auth.user._id).length <= 0 ? (
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
                    <div className='dashboard--profile-following--container'>
                        <h2>{profile.user.firstName}s followers</h2>
                        <ProfileFollowers followerProfiles={followerProfiles}/>
                    </div>
                </Fragment>
                }
            </div>
       </Fragment>
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