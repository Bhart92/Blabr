import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, getProfiles } from '../../actions/profile';
import { filterNewsByKeyword } from '../../actions/news';
import DashboardProfile from './DashboardProfile';
import Spinner from '../layout/Spinner';
import { loadUser } from '../../actions/auth';
import { getPosts } from '../../actions/posts';

const Dashboard = ({   
    getCurrentProfile,
    getPosts,
    post,
    auth: { user, isAuthenticated },
    profile: { profile, loading } 
}) => {
    useEffect(() => {
        loadUser();
        getCurrentProfile();
        getPosts();
    },[loadUser, getCurrentProfile, getPosts]);
    return user === null ? <Spinner /> : 
    <div className='dashboard--container'>
        <div className='dashboard--center-console'>
            <div className='dashboard--newsfeed'>
               {isAuthenticated && !profile ? (
               <div className='dashboard--spinner'>
                   <Spinner />
                   <h2>Please create a profile</h2>
                <Link className='create-button' to='create-profile'>Create your profile</Link>
               </div>) : (<Fragment>
                <DashboardProfile loading={loading} user={user}/>
               </Fragment>
               )}
            </div>
        </div>
    </div>;
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });

export default connect(mapStateToProps,{ getPosts, getCurrentProfile, deleteAccount, loadUser })(Dashboard);