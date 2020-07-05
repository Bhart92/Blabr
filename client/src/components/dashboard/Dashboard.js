import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, getProfiles } from '../../actions/profile';
import { filterNewsByKeyword } from '../../actions/news';
import DashboardProfile from './DashboardProfile';
import { getNews } from '../../actions/news';
import Spinner from '../layout/Spinner';
import { loadUser } from '../../actions/auth';

const Dashboard = ({   
    getCurrentProfile,
    logout,
    getNews,
    deleteAccount,
    auth: { user },
    posts,
    profile: { profile, loading } 
}) => {
    useEffect(() => {
        getCurrentProfile();
        loadUser();
        getNews();
    },[loadUser, getCurrentProfile]);
    
    return user === null ? <Spinner /> : 

    <div className='dashboard--container'>
        <div className='dashboard--center-console'>
            <div className='dashboard--newsfeed'>
               {!profile ? (<Fragment>
                <Link to='create-profile'>Create your profile</Link>
               </Fragment>) : (<Fragment>
                <DashboardProfile loading={loading} user={user}/>
               </Fragment>)}
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

export default connect(mapStateToProps,{ getCurrentProfile, getNews, deleteAccount, loadUser })(Dashboard);