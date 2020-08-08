import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/posts';

const CommentItem = ({
    postId,
    comment,
    comment: { _id, text, name, handle, avatar, user, date },
    auth,
    deleteComment
}) => {
  console.log(comment)
  return (
        <div className='comment-item'>
          <div className='comment-item--userTitle'>
            <div>
              <Link to={`/profile/${user}`}>
                          <img
                            src={avatar}
                            alt=""
                          />
                          <h4>{name}</h4>
                          <span>{handle}</span>
              </Link>
            </div>
            <div>
            <p>
                Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
              <button
              className='comment-item--delete'
              onClick={e => deleteComment(postId, _id)}
              type='button'
              >
                <span>Delete Comment</span>
              </button>
            )}
            </div>
          </div>
          <div className='comment-item--info'>
            <p className='comment--item--info--desc'>
                {text}
            </p>
          </div>
        </div>
    )
            };

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);