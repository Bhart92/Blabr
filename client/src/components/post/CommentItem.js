import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/posts';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment
}) => (
        <Fragment>
          <div>
            <Link to={`/profile/${user}`}>
              <img
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p>
                {text}
            </p>
             <p>
                Posted on <Moment format='YYY/MM/DD'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
              <button
              onClick={e => deleteComment(postId, _id)}
              type='button'
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </div>
        </Fragment>
    )

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