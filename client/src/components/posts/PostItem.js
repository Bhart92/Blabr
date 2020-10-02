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
  post: { _id, text, url, title, repostHandle, repostAvatar, repostName, originalCommentary, commentary, handle, image, description, fullName, avatar, user, likes, comments, date }
}) => {
    const modals = document.querySelectorAll('.retweet--modal')
    const modalsArr = Array.from(modals);

    const tweetSettingModals = document.querySelectorAll('.post--item--settings-modal')
    const tweetSettingsArray = Array.from(tweetSettingModals);

    const postItems = document.querySelectorAll('.post--item')
    const postItemsArray = Array.from(postItems);


    const toggleRetweetModal = (array, array2, i) => {
      const overlay = document.querySelector('.retweet--modal--overlay');
      overlay.classList.toggle('retweet-active-overlay');
      const element = array[i]
      const elementTwo = array2[i]
      elementTwo.classList.toggle('remove-overflow');
      element.classList.toggle('retweet-active');
    }


    const toggleTweetSettingsModal = (array, array2, i) => {
      const overlay = document.querySelector('.retweet--modal--overlay');
      overlay.classList.toggle('retweet-active-overlay');
      const element = array[i]
      const elementTwo = array2[i]
      elementTwo.classList.toggle('remove-overflow');
      element.classList.toggle('retweet-active');
    }


    const toggleClearModal = (array, array2, array3, i) => {
      const overlay = document.querySelector('.retweet--modal--overlay');
      overlay.classList.remove('retweet-active-overlay');
      array.map((item, i) => {
        item.classList.remove('retweet-active')
      })
      array2.map((item, i) => {
        item.classList.remove('retweet-active')
      })
      array3.map((item, i) => {
        item.classList.remove('remove-overflow')
      })

    }
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
          setIsOpen(true);
    }
    function closeModal(){
            setIsOpen(false);
    }
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        minWidth              : '550px',
        maxWidth              :'650px',
        minHeight             : '375px',
        maxHeight             : '425px',
        height                : '400px',
        width                 : '600px',
        zIndex               : '50',
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
    <div className='retweet--modal--overlay' onClick={() => toggleClearModal(modalsArr, tweetSettingsArray, postItemsArray, i)}></div>
    <Modal
            className='retweet--modal'
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
                <div id='modal--container' className='tweet-comment--modal'> 

                </div>
        </Modal>
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
<span className='post--item--down-carrot'><i class="fas fa-chevron-down" onClick={() => toggleTweetSettingsModal(tweetSettingsArray, postItemsArray, i)}></i></span>
<Link className='post--body--image--link__main' to={`/posts/${_id}`}> 

  <div className='post--header'>
    <img src={avatar} alt={fullName} />
  </div>
  <div className='post--body'>
    <div className='post--body--title'>
      <span>{fullName} &nbsp;</span>
      <span>@{handle} &middot;&nbsp;</span> 
       <DayJS format={"MM/D/YYYY"} element={"span"}>{date}</DayJS>
    </div>
    <div className='post--body--content'>
<div className='post--body--text'>{commentary.length > 125 ?<p>{commentary.slice(0, 125)}...</p> : <p>{commentary}</p>}</div>
      <div className='post--body--image'>
        <Link className='post--body--image--link' to='google.com'> 
        <div className='post--body--image--left'>
          {image !== undefined ? <Fragment><img src={image} alt={fullName} /></Fragment> : <Fragment><i className='fa fa-commenting'></i></Fragment>}</div>
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
      <i class="far fa-comment-dots" onClick={() => openModal()}></i>
    </div>
    <div className='post--actionBar--icon-container'>

      <div className='retweet--modal'>
        <span>Retweet</span>
        <span>Quote Tweet</span>
      </div>
      <i class="fas fa-retweet" onClick={() => toggleRetweetModal(modalsArr, postItemsArray, i)}></i>
      
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