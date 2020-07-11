import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
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
    <Fragment>
      <ul>
      {userPostArray.map(item => {
            return <li key={item._id}>
                <p>{item.text.substring(0, 50)}...</p>
                <Link to={`/posts/${item._id}`}>Read more</Link>
                <p><Moment format='MM/YYYY'>{item.date}</Moment></p>
            </li>
        })}
      </ul>
    </Fragment>
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