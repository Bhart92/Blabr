import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileTop from '../profile/ProfileTop';
import CreateProfile from '../profile-forms/CreateProfile';
import DashboardPosts from './DashboardPosts';
import Spinner from '../layout/Spinner';
import ProfileFollowers from '../profile/ProfileFollowers';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardProfile = ({ post, user }) => {
 
    return (
        <main className='dashboard--profile'>
            <div className='dashboard--profile--container'>
                <div className='dashboard--profile--center-console'>

                </div>
                <aside className='dashboard--profile--aside-bar'>

                </aside>
            </div>
            </main>
    );
};

DashboardProfile.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(DashboardProfile);