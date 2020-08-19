import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, getProfiles } from '../../actions/profile';
import { filterNewsByKeyword } from '../../actions/news';
import DashboardProfile from './DashboardProfile';
import Spinner from '../layout/Spinner';
import { loadUser } from '../../actions/auth';

const Dashboard = ({   
    getCurrentProfile,
    logout,
    deleteAccount,
    auth: { user, isAuthenticated },
    posts,
    profile: { profile, loading } 
}) => {
    useEffect(() => {
        loadUser();
        getCurrentProfile()
    },[loadUser]);
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
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    news: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getNews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    posts: state.posts,
    news: state.news
  });

export default connect(mapStateToProps,{ getCurrentProfile, deleteAccount, loadUser })(Dashboard);