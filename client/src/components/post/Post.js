import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/posts';



const Post = ({ getPost, match, post: { post, loading } }) => {
   useEffect(() => {
       getPost(match.params.id);
   }, [ getPost, match.params.id ]);
    return loading || post === null ? <Spinner /> : <div className='post--container'>
        <Link className='btn--back' to='/posts'>
            Back to posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div>
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </div>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});
export default connect(mapStateToProps, { getPost })(Post);