import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardNavBar from './DashboardNavBar';
import DashboardProfile from './DashboardProfile';



const Dashboard = ({   
 
}) => {
    return <div className='dashboard--container'>
        <DashboardNavBar />
        <DashboardProfile />
    </div>;
};

Dashboard.propTypes = {

};

const mapStateToProps = state => ({
  });

export default connect(mapStateToProps)(Dashboard);