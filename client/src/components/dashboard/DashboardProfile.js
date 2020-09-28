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
        <div>DashboardProfile</div>
    );
};

DashboardProfile.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(DashboardProfile);