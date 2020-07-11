import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/posts';

const WidgetPostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  console.log(post)

  return (
  <div className='post-item'>
    <div className='post--header'>
      <Link to={`/profile/${user}`}>
        <h4>{name}</h4>
      </Link>
      <span><Moment format='MM/YYYY'>{date}</Moment></span>
    </div>
    <div className='post--header'>
    <p>{text.slice(0,35)}...</p>
    <Link to=''>Read More...</Link>
    </div>

  </div>
);
}

WidgetPostItem.defaultProps = {
};

WidgetPostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(WidgetPostItem);