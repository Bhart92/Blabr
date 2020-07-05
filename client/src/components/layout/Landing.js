import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NewsFeed from './NewsFeed';
import Navbar from './Navbar';
import { getCurrentProfile } from '../../actions/profile';

const Landing = ({isAuthenticated}) => {

    return (
        <Fragment>
                    <Navbar />
            <NewsFeed />
        </Fragment>
    )
}
Landing.propTypes = {
    auth: Proptypes.object.isRequired,
    profile: Proptypes.object.isRequired
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps)(Landing);