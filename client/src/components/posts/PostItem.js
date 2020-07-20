import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import RepostForm from './RepostForm';
import { addLike, removeLike, deletePost } from '../../actions/posts';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, url, title, commentary, handle, image, description, name, avatar, user, likes, comments, date }
}) => {
return (


<div className='post-item'>
<div className='post--header'>
  <div>
  <Link to={`/profile/${user}`}>
    <img src={avatar} />
        <h4>{name}</h4>
        <span>@{handle}</span>

      </Link>
  </div>
  <div>

  <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
  <p className='post-date'>
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
      </p>
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

  </div>
    <div className='post--body'>
            <p className='my-1'>{commentary ? commentary : text}</p>
            {image !== undefined && description !== undefined && (
              <div className='repost'>
                <p>{commentary !== undefined ? text : ''}</p>
                <img src={image} />
                <p>{description.slice(0,150)}... <a href={url}>Read More</a></p>
              </div>
            )}
          <div className='post--actionBox'>
              <i className='fa fa-thumbs-o-up'></i>
              <i className='fa fa-commenting-o'></i>
              <RepostForm user={auth.user} title={title} description={description} name={name} avatar={avatar} url={url} image={image} text={text}/>
          </div>
    </div>
  </div>
);
      }

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
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);