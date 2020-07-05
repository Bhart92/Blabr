import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/posts';

const ProfilePosts = ({ getPosts, user, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

const userPostArray = posts.filter(post => post.user == user._id)
  
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1>Your Posts</h1>
        {userPostArray.map(item => {
            return <li key={item._id}>
                <p>{item.text}</p>
                <p>{item.date}</p>
                <p>{item.likes.length <= 0 ? '' : item.likes.length}</p>
            </li>
        })}
    </div>
  );
};

ProfilePosts.propTypes = {
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
)(ProfilePosts);