import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const Dashboard = ({   
 
}) => {
    return <div className='dashboard--container'>
        Dashboard
    </div>;
};

Dashboard.propTypes = {

};

const mapStateToProps = state => ({
  });

export default connect(mapStateToProps)(Dashboard);