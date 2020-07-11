import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/posts';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => (


<div className='post-item'>
<div className='post--header'>
  <div>
  <Link to={`/profile/${user}`}>
    <img src={avatar} />
        <h4>{name}</h4>
      </Link>
      <span>{user.handle}</span>
      {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
             Delete Post
            </button>
          )}
  </div>
  <div>

  <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
  <p className='post-date'>
    
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
  </div>

  </div>
    <div className='post--body'>
            <p className='my-1'>{text}</p>
    </div>
  </div>
);

PostItem.defaultProps = {
};

PostItem.propTypes = {
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
)(PostItem);