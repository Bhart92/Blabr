import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

const Posts = ({ getPosts, user, post: { posts, loading } }) => {

  return <div className='post--container'>
          <div className='post--container--title'>
            <h1>Home</h1>
            <i className="fas fa-home"></i>
          </div>
          <div className='post--container--form'>

          <PostForm user={user}/>
          </div>
      <div className='post--container--posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} showActions={true}/>
        ))}
      </div>
    </div>
};
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);