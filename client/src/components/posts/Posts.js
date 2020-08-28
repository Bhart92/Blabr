import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

const Posts = ({ getPosts, profile: {profile}, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  if(profile === null) return <Redirect to='/dashboard' />
  return loading ? (
    <Spinner />
  ) : (
    <div className='post--container'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} showActions={true}/>
        ))}
      </div>
    </div>
  );
};
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);