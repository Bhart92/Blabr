import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

const DashboardPosts = ({ getPosts, user, profile: { profile }, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

const visitedPostArray = posts.filter(post => post.user == profile.user._id)
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <ul>
      {visitedPostArray.map(item => {
            return <li key={item._id}>
                <p>{item.text.substring(0, 75)}...</p>
                <Link to={`/posts/${item._id}`}>Read more</Link>
                <p>{item.date}</p>
            </li>
        })}
      </ul>
    </div>
  );
};

DashboardPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  user:state.auth.user
});

export default connect(
  mapStateToProps,
  { getPosts }
)(DashboardPosts);