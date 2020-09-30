import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayJS from 'react-dayjs';
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
{/* <div id="progressBar" class="progress_bar"></div> */}
    // // Assign your element ID to a variable.
    // var progress = document.getElementById("progressBar");
    // // Pause the animation for 100 so we can animate from 0 to x%
    // setTimeout(
    //   function(){
    //     progress.style.width = "100%";
    //     // PHP Version:
    //     // progress.style.width = "<?php echo $progressPercentage; ?>";
    //     progress.style.backgroundColor = "green";
    //   }
    // ,100);

  const [likeStatus, setLikeStatus] = useState(false);
  const likePost = (id) => {
    setLikeStatus(true);
    addLike(id);
  }
return user === null ? <Spinner /> :
(
<div className='post--item'>
  <div className='post--header'>
    <img src={avatar} alt={name} />
  </div>
  <div className='post--body'>
    <div className='post--body--title'>
      <span>{name}Name</span>
      <span>@{handle} &middot; </span> 
       <DayJS format={"MM/D/YYYY"} element={"span"}>{date}</DayJS>
      <span><i class="fas fa-chevron-down"></i></span>
    </div>
    <div className='post--body--text'>
      <p>{commentary}</p>
    </div>
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