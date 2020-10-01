import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import DashboardNavBar from '../dashboard/DashboardNavBar';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/posts';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Post = ({ getPost, user, match, post: { post, loading } }) => {
   useEffect(() => {
       getPost(match.params.id);
   }, [ getPost, match.params.id ]);
    return loading || post === null ? <Spinner /> : (
        <Fragment>
            <Fragment>
            <DashboardNavBar user={user}/>
                </Fragment>
                <Fragment>
                <div className='post--container'>
                    <Link className='btn--back' to='/posts'>
                        Back to posts
                    </Link>
                    {/* <PostItem post={post} showActions={false} /> */}
                    {/* <CommentForm postId={post._id} /> */}
                    <div className='comment--item-container'>
                        ppp
                        {/* {post.comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} postId={post._id} />
                        ))} */}
                    </div>
                </div>
                </Fragment>
        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    user: state.auth.user
});
export default connect(mapStateToProps, { getPost })(Post);