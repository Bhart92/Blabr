import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import RepostForm from './RepostForm';
import Spinner from '../layout/Spinner';
import RepostItem from './RepostItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost, addPost } from '../../actions/posts';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  showActions,
  auth,
  post: { _id, text, url, title, repostHandle, repostAvatar, repostName, originalCommentary, commentary, handle, image, description, name, avatar, user, likes, comments, date }
}) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const likePost = (id) => {
    setLikeStatus(true);
    addLike(id);
  }
return user === null ? <Spinner /> :
(
<div className='post--item'>
  <div className='post--header'>
    <div>
      <Link to={`/profile/${user}`}>
        <img src={avatar} />
        <h4>{name}</h4>
        <span>@{handle}</span>
      </Link>
    </div>
    <div>
      <p className='post--date'>
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <Fragment>
          <button
            onClick={() => deletePost(_id)}
            type='button'
            className='btn btn-danger'
          >
            Delete Post
          </button>
        </Fragment>
      )}
    </div>
  </div>
    <div className='post--body'>
      <p className='my-1'>{text === undefined || text === null ? commentary : text}</p>
      {image !== undefined && image.length == 0 && (
        <div className='repost'>
          {repostAvatar === undefined || null ? '' : (
            <div className='repost--OG-info'>
              <img className='repost--avatar' src={repostAvatar}/>
              <div className='repost--OG-info__names'>
                <p>{repostName}</p>
                <p>@{repostHandle}</p> &nbsp; 
              </div>
              <p className='repost--date'><Moment format='MMM/YY'>{date}</Moment></p>
            </div>
          )}
              {text !== undefined && text !== null && <p className='repost--commentary'>{commentary}</p>}
          {title && <p>{title.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('')}</p>}
            <Fragment>
              <i className='fa fa-commenting article-image-missing'></i>
            </Fragment>
            {description && <Fragment><p>{description.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').slice(0,150)}... <a href={url}>Read More</a></p></Fragment>}
        </div>
        )}
        {image && description && <RepostItem repostAvatar={repostAvatar} title={title} repostHandle={repostHandle} commentary={commentary} repostName={repostName} text={text} date={date} image={image} description={description} url={url}/>}
        {!image && !description && text && commentary && <RepostItem repostAvatar={repostAvatar} title={title} repostHandle={repostHandle} commentary={commentary} repostName={repostName} text={text} date={date} image={image} description={description} url={url}/>}         
        {showActions ? (
          <Fragment>
            <div className='post--actionBox'>
              <span>

                { likes && auth.user && likes.filter(like => like.user === auth.user._id).length === 1 ? (
                <Fragment>
                  <i onClick={() => removeLike(_id)} className='fa fa-thumbs-o-down '></i>
                </Fragment>
                ) : (
                <Fragment>
                  <i onClick={() => addLike(_id)} className='fa fa-thumbs-o-up '></i>
                </Fragment>
                  )}

                { likes.length <= 0 ? '' : <span className='like-count'>{likes.length}</span> }
              </span>
              <Link to={`/posts/${_id}`}><i className='fa fa-commenting-o'></i></Link>
              <RepostForm originalCommentary={originalCommentary} commentary={commentary} user={auth.user} handle={handle} repostAvatar={avatar} repostHandle={repostHandle} repostName={name} title={title} description={description} name={name} avatar={avatar} url={url} image={image} text={text}/>
            </div>
          </Fragment>
          ): (
          <Fragment>
            <div className='comment--item--likes'>
              {likes.length > 0 ? <p>Like count: 
                <span className='like-count'>
                  {likes.length}
                </span></p> 
                : 
                ''
              }
            </div>
        </Fragment>
        )}
    </div>
  </div>
  );
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