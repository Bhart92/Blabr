import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ isAuthenticated, getProfiles, profile: { profiles, loading } }) => {
   useEffect(() => {
       getProfiles();
   }, [getProfiles])
   if(!isAuthenticated){
    return <Redirect to='/' />;
    }
    return <div className='profiles--container'>
        {loading ? <Spinner /> : <Fragment>
            <h1>Profiles</h1>
            <div>
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4>No Profiles Found</h4>}
            </div>
            </Fragment>}
    </div>;
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getProfiles })(Profiles);