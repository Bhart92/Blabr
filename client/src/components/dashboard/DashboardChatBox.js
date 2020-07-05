import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from '../posts/PostForm';



const DashboardChatBox = ({
    auth: { user },
    profile: { profile, loading } 
}) => {
    
    return <Fragment>

        <h1>Home</h1>

        <PostForm />

    </Fragment>;

};

DashboardChatBox.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });

export default connect(mapStateToProps)(DashboardChatBox);