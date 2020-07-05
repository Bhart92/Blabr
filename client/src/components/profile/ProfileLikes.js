import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/posts';

const ProfileLikes = ({ getPosts, user, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

// const userPostArray = posts.filter(post => post.user == user._id)
  
const likeIDs = posts.map(post =>{
    return post.likes.filter(like => like.user == user._id);
})
console.log(filtered);
//   const filteredArr = mappedArrayed.filter(post => post.user == user._id);
  
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1>Posts that you've liked</h1>
        {/* {userPostArray.map(item => {
            return <li key={item._id}>
                <p>items</p>

            </li>
        })} */}
    </div>
  );
};

ProfileLikes.propTypes = {
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
)(ProfileLikes);