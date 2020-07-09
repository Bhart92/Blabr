import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, getProfiles } from '../../actions/profile';
import ProfileWidgetItem from './ProfileWidgetItem';

const DashboardProfileWidget = ({ auth: {user}, getCurrentProfile, getProfiles, profile: {profiles, loading}}) => {

  useEffect(() => {
    getProfiles();
  }, []);

    const shortArr = profiles.slice(0, 3);
  return (
    <Fragment>
      <div className='dashboard--profile-widget'>
      <h2>People to follow</h2>
          {shortArr.map((profile, i) => {
            return (
              <ProfileWidgetItem key={i} profile={profile} user={user} />
            )
          })}
         <span className='seeMore'><Link to='/profiles'>See More</Link></span>
      </div>
    </Fragment>
  );

};

DashboardProfileWidget.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getProfiles }
)(DashboardProfileWidget);