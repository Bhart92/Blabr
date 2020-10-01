import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayJS from 'react-dayjs';
import Modal from 'react-modal';
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
  i,
  post: { _id, text, url, title, repostHandle, repostAvatar, repostName, originalCommentary, commentary, handle, image, description, name, avatar, user, likes, comments, date }
}) => {
  console.log(image)
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
    const modals = document.querySelectorAll('.retweet--modal')
    const modalsArr = Array.from(modals);

    const tweetSettingModals = document.querySelectorAll('.post--item--settings-modal')
    const tweetSettingsArray = Array.from(tweetSettingModals);


    const toggleRetweetModal = (array, i) => {
      const overlay = document.querySelector('.retweet--modal--overlay');
      overlay.classList.toggle('retweet-active-overlay');
      const element = array[i]
      element.classList.toggle('retweet-active');
    }
    const toggleTweetSettingsModal = (array, i) => {
      const overlay = document.querySelector('.retweet--modal--overlay');
      overlay.classList.toggle('retweet-active-overlay');
      const element = array[i]
      element.classList.toggle('retweet-active');
    }
    const toggleClearModal = (array, array2,  i) => {
      const overlay = document.querySelector('.retweet--modal--overlay');
      overlay.classList.remove('retweet-active-overlay');
      array.map((item, i) => {
        item.classList.remove('retweet-active')
      })
      array2.map((item, i) => {
        item.classList.remove('retweet-active')
      })

    }
    const customStyles = {
      content : {
        position              : 'relative',
        // top                   : 'unset',
        // left                  : '330px',
        // right                 : 'unset',
        // bottom                : '70px',
        height                : '100px',
        width                 : '125px',
        background            : '#FFF',
        borderRadius          : '25px',
        boxShadow             : 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
      }
  };
  const [likeStatus, setLikeStatus] = useState(false);
  const likePost = (id) => {
    setLikeStatus(true);
    addLike(id);
  }
return user === null ? <Spinner /> :
(
  <Fragment>
    <Fragment>
    <div className='retweet--modal--overlay' onClick={() => toggleClearModal(modalsArr, tweetSettingsArray, i)}></div>

    </Fragment>

    <div className='post--item'>
      <div className='post--item--settings-modal'>
      <span>Retweet</span>
        <span>Quote Tweet</span>
        <span>Retweet</span>
        <span>Quote Tweet</span>
        <span>Retweet</span>
        <span>Quote Tweet</span>
      </div>
<span className='post--item--down-carrot'><i class="fas fa-chevron-down" onClick={() => toggleTweetSettingsModal(tweetSettingsArray, i)}></i></span>
<Link className='post--body--image--link__main' to={`/posts/${_id}`}> 

  <div className='post--header'>
    <img src={avatar} alt={name} />
  </div>
  <div className='post--body'>
    <div className='post--body--title'>
      <span>{name}Name &nbsp;</span>
      <span>@{handle} &middot;&nbsp;</span> 
       <DayJS format={"MM/D/YYYY"} element={"span"}>{date}</DayJS>
    </div>
    <div className='post--body--content'>
<div className='post--body--text'>{commentary.length > 125 ?<p>{commentary.slice(0, 125)}...</p> : <p>{commentary}</p>}</div>
      <div className='post--body--image'>
        <Link className='post--body--image--link' to='google.com'> 
        <div className='post--body--image--left'>
          {image !== undefined ? <Fragment><img src={image} alt={name} /></Fragment> : <Fragment><i className='fa fa-commenting'></i></Fragment>}</div>
        <div className='post--body--image--right'>
          <span>This will be the title</span>
          <p>words words words words words words words words words words words words</p>
          <a><i class="fas fa-link"></i>SomeLink.com</a>
          </div>
          </Link>
      </div>
    </div>
  </div>
  </Link>
  <div className='post--actionBar'>
    <div className='post--actionBar--icon-container'>
      <i class="far fa-comment-dots"></i>
    </div>
    <div className='post--actionBar--icon-container'>

      <div className='retweet--modal'>
        <span>Retweet</span>
        <span>Quote Tweet</span>
      </div>
      <i class="fas fa-retweet" onClick={() => toggleRetweetModal(modalsArr, i)}></i>
      
      </div>
    <div className='post--actionBar--icon-container'><i class="far fa-heart"></i></div>
    <div className='post--actionBar--icon-container'><i class="fas fa-upload"></i></div>
  </div>
 </div>
  </Fragment>

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