import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

const DashboardPosts = ({ getPosts, user, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

const userPostArray = posts.filter(post => post.user == user._id)
  
  return loading ? (
    <Spinner />
  ) : (
    <div>
        {userPostArray.map(item => {
            return <li key={item._id}>
                <p>{item.text.substring(0, 75)}...</p>
                <Link to={`/posts/${item._id}`}>Read more</Link>
                <p>{item.date}</p>
            </li>
        })}
    </div>
  );
};

DashboardPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  user:state.auth.user
});

export default connect(
  mapStateToProps,
  { getPosts }
)(DashboardPosts);