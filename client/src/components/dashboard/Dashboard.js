import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardNavBar from './DashboardNavBar';
import DashboardProfile from './DashboardProfile';
import Spinner from '../layout/Spinner';
import Posts from '../posts/Posts';
import { getPosts } from '../../actions/posts';


const Dashboard = ({   
  user,
  getPosts,
  post
}) => {
  useEffect(() => {
    getPosts();
  })
    return user === null ? <Spinner /> : <div className='dashboard--container'>
        <DashboardNavBar user={user}/>
        <Posts user={user} posts={post}/>
    </div>;
};

Dashboard.propTypes = {

};

const mapStateToProps = state => ({
  user: state.auth.user,
  post: state.posts
  });

export default connect(mapStateToProps, {getPosts})(Dashboard);