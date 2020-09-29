import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardNavBar from './DashboardNavBar';
import DashboardProfile from './DashboardProfile';
import Spinner from '../layout/Spinner';
import Posts from '../posts/Posts';

const Dashboard = ({   
  user
}) => {
    return user === null ? <Spinner /> : <div className='dashboard--container'>
        <DashboardNavBar user={user}/>
        <Posts user={user}/>
    </div>;
};

Dashboard.propTypes = {

};

const mapStateToProps = state => ({
  user: state.auth.user
  });

export default connect(mapStateToProps)(Dashboard);