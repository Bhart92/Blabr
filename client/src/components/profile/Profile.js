import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import CreateProfile from '../profile-forms/CreateProfile';
import ProfilePosts from '../profile/ProfilePosts';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { follow } from '../../actions/profile';


const Profile = ({  getProfileById, follow, match,  profile: {profile}, auth:{isAuthenticated}}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById ,match.params.id]);
    return (
    <div className='profile--container'>
        {profile === null  ?  <Spinner /> : <Fragment>
            <div className='profile--top'>
                {profile.user === null ? <Spinner /> : (
                <Fragment>
                    <img src={profile.user.avatar} />
                        <h1>{`${profile.user.firstName} ${profile.user.lastName}`}</h1>
                        <span>{profile.user.handle}</span>
                        <button onClick={e => follow(e, match.params.id)}>Follow</button>
                </Fragment>)}
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

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileById, follow })(Profile);