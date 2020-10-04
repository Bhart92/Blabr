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
  post,
  post: { _id, text, url, title, repostHandle, repostAvatar, repostName, originalCommentary, commentary, handle, image, description, fullName, avatar, user, likes, comments, date }
}) => {
  console.log('*******')
  console.log(text)
  console.log('*******')
  console.log(commentary)
  console.log('*******')



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

      overlay.classList.remove('retweet-active-overlay')

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
    const replyModal = {
      content : {
        top                   : '5%',
        left                  : '50%',
        minWidth              : '550px',
        maxWidth              :'650px',
        minHeight             : '375px',
        maxHeight             : '450px',
        height                : 'auto',
        width                 : '600px',
        zIndex                : '10000',
        background            : '#FFF',
        borderRadius          : '25px',
        boxShadow             : 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
      }
  };
  const redFont = {
    color         : 'darkRed'
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
    <div className='retweet--modal--overlay ' onClick={() => toggleClearModal(modalsArr, tweetSettingsArray, postItemsArray, i)}></div>
    <Modal
            className='retweet--modal'
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={replyModal}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
                <div id='modal--container' className='tweet-comment--modal'> 
                  <div className='retweet-modal--upper'><i className='fa fa-times'onClick={() => closeModal()} ></i></div>
                  <div className='retweet-modal--lower'>
                    <div className='retweet-modal--lower-container'>
                      <div className='retweet-modal--article-container'>
                        <article>
                          
                          <div className='retweet--poster-image-container'>
                            <div className='retweet--poster-image-inner'>
                              <img src={avatar} />
                              <div className='greyBar'><div className='greyBar-inner'></div></div>
                            </div>
                          </div>
                          <div className='retweet--poster-content'>
                            <div className='retweet--poster--title'>
                              <span>{fullName} &nbsp;</span>
                              <span>@{handle} &middot;&nbsp;</span> 
                              <DayJS format={"MM/D/YYYY"} element={"span"}>{date}</DayJS>
                            </div>
                            <div className='retweet--poster--text--container'>
                              <div className='retweet--poster--text'>
                                <p>{commentary}</p>
                              </div>
                            </div>
                          </div>
                        </article>
                        <div className='retweet-modal--reply-to'>
                          <div className='reply-to--user'><p>Replying to <a href='#'>@{auth.user.handle}</a></p></div>
                        </div>
                      </div>
                      <div className='retweet-modal--reply-content'>
                        <div className='retweet--poster-image-container'>
                            <div className='retweet--poster-image-inner'>
                              <img src={auth.user.avatar} />
                            </div>
                          </div>
                          <div className='retweet--textarea'>
                            <textarea placeholder='Blab your reply'
                                      maxLength='280'
                                      name='commentary'
                                      cols='30'
                                      rows='5'
                                      ></textarea>
                          </div>

                      </div>
                      <div className='retweet--submit-actions'>
                        <div>
                          <i class="far fa-image"></i>
                          <i class="fas fa-film"></i>
                          <i class="fas fa-bars"></i>
                          <i class="far fa-smile"></i>
                          <i class="far fa-calendar-alt"></i>
                        </div>
                        <div>
                          <input type='submit' value='Blab' />
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
        </Modal>
    </Fragment>

    <div className='post--item'>
      <div className='post--item--settings-modal'>
        {user.toString() === auth.user._id ? (
                    <Fragment>
                    <div className='post--item--menu-item'><i class="far fa-trash-alt" style={redFont}></i><span style={redFont}> Delete Tweet</span></div>
                    <div className='post--item--menu-item'><i class="fas fa-thumbtack"></i><span>Pin tweet</span></div>
                    <div className='post--item--menu-item'><i class="fas fa-code"></i><span>Embed Tweet</span></div>
                    <div className='post--item--menu-item'><i class="far fa-chart-bar"></i><span>Analytics</span></div>
                    </Fragment>
        ) : (
          <Fragment>
          <div className='post--item--menu-item post--item--menu-item-other'><i class="far fa-frown-open"></i><span> Not Interested in this Tweet</span></div>
          <div className='post--item--menu-item post--item--menu-item-other'><i class="fas fa-user-times"></i><span>Unfollow User</span></div>
          <div className='post--item--menu-item post--item--menu-item-other'><i class="far fa-list-alt"></i><span>Add/Remove from Lists</span></div>
          <div className='post--item--menu-item post--item--menu-item-other'><i class="fas fa-volume-mute"></i><span>Mute User</span></div>
          <div className='post--item--menu-item post--item--menu-item-other'><i class="fas fa-ban"></i><span>Block User</span></div>
          <div className='post--item--menu-item post--item--menu-item-other'><i class="fas fa-code"></i><span>Embed Tweet</span></div>
          <div className='post--item--menu-item post--item--menu-item-other'><i class="far fa-flag"></i><span>Report Tweet</span></div>
          </Fragment>
          )}
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
        <div className='post--item--menu-item'><i class="fas fa-retweet"></i> ReTweet</div>
        <div className='post--item--menu-item'><i class="fas fa-pencil-alt"></i> Quote Tweet</div>
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