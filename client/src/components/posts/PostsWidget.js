import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import WidgetPostItem from './WidgetPostItem';
import { getPosts } from '../../actions/posts';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const postsArr = posts.slice(0,4);
  return loading ? (
    ''
  ) : (
    <Fragment>
      <div className='postsWidget' id='posts'>
      <h2>Posts</h2>
        {postsArr.map(post => (
          <WidgetPostItem key={post._id} post={post} />
        ))}
            <span className='seeMore'><Link to='/posts'>See More</Link></span>
      </div>
    </Fragment>
  );
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