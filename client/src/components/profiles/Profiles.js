import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
   useEffect(() => {
       getProfiles();
   }, [getProfiles])
    return <Fragment>
        {loading ? <Spinner /> : <Fragment>
            <h1>Profiles</h1>
            <i className='fab fa-connectdevelop'></i>
            <div>
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4>No Profiles Found</h4>}
            </div>
            </Fragment>}
    </Fragment>;
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);