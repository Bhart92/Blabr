import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NewsFeed from '../newsfeed/NewsFeed';
import Navbar from './Navbar';
import Alert from './Alert';

const Landing = ({isAuthenticated}) => {

    return (
        <Fragment>
            <Alert />
            <Navbar />
            <NewsFeed />
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);