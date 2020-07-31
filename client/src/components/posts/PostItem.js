import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import RepostForm from './RepostForm';
import Spinner from '../layout/Spinner';
import RepostItem from './RepostItem';
import { addLike, removeLike, deletePost } from '../../actions/posts';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post,
  post: { _id, text, url, title, repostHandle, repostAvatar, repostName, originalCommentary, commentary, handle, image, description, name, avatar, user, likes, comments, date }
}) => {
  console.log('***********' )
  console.log('Commentary:' + commentary)
  console.log('Text:' + text)
  console.log('***********' )



return user === null ? <Spinner /> :
(
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
            <p className='my-1'>{text === undefined || text === null ? commentary : text}</p>


        {/* FIND A WAY TO DISPLAY REPOST WHEN COMMENTARY ALONE IS REPOSTED */}
          {image && description && <RepostItem originalCommentary={originalCommentary} repostAvatar={repostAvatar} title={title} repostHandle={repostHandle} commentary={commentary} repostName={repostName} text={text} date={date} image={image} description={description} url={url}/>}
          {!image && !description && text && commentary && <RepostItem originalCommentary={originalCommentary} repostAvatar={repostAvatar} title={title} repostHandle={repostHandle} commentary={commentary} repostName={repostName} text={text} date={date} image={image} description={description} url={url}/>}


          <div className='post--actionBox'>
              <i className='fa fa-thumbs-o-up'></i>
              <i className='fa fa-commenting-o'></i>
              <RepostForm originalCommentary={originalCommentary} commentary={commentary} user={auth.user} handle={handle} repostAvatar={avatar} repostHandle={repostHandle} repostName={name} title={title} description={description} name={name} avatar={avatar} url={url} image={image} text={text}/>
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