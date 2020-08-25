import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';
import Modal from 'react-modal';
import RepostItem from './RepostItem';
import Spinner from '../layout/Spinner';

const PostForm = ({ addPost, title, handle, originalCommentary, commentary, repostName, repostAvatar, user, avatar, repostHandle, name, description, url, image }) => {
  const [repostModalOpen, setRepostModalOpen] = useState(false);
  const [commentaryModalOpen, setCommentaryModalOpen] = useState(false);
  const [text, setText] = useState('');

  function toggleBodyOverflow() {
    const body = document.querySelector('body');
    body.classList.toggle('overflow');
  }

  function openRepostModal() {
    setRepostModalOpen(true);
    toggleBodyOverflow();
  }
  
  function closeRepostModal(){
    setRepostModalOpen(false);
    toggleBodyOverflow();
    }

  function openCommentaryModal() {
    setCommentaryModalOpen(true);
    toggleBodyOverflow();
    }
    
  function closeCommentaryModal(){
    setCommentaryModalOpen(false);
    toggleBodyOverflow();
      }

    const customStyles = {
      content : {
        position              : 'fixed',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
        height                : '135px',
        width                 : '300px',
        textAlign             : 'center'
      }
    };

    const customStylesSecond = {
      content : {
        position              : 'fixed',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
        height                : '670px',
        width                 : '25%',
        background            : '#FFF'
      }
    };

const onSubmit = (e) => {
    e.preventDefault();
    addPost({ title, handle, name, avatar, repostName, repostHandle, repostAvatar, commentary, description, url, image, text });
}

return user === null ? <Spinner /> : (
    <div className='post-form'>
      <i className="fas fa-retweet" onClick={openRepostModal}></i>
      <Modal
          className='repost-item-modal'
          isOpen={repostModalOpen}
          onRequestClose={closeRepostModal}
          style={customStyles}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        <div className='repost--modal'> 
          <div>
            <button onClick={closeRepostModal}>X</button>
          </div>
          <div className='repost--modal--header' onClick={e => {
            onSubmit(e);
            closeRepostModal();
          }}>
            <p><i className="fas fa-retweet"></i> &nbsp;Repost</p>
          </div>
          <div onClick={() => {
            closeRepostModal();
            openCommentaryModal();
          }} className='repost--modal--header'>
            <p><i className='fa fa-commenting'></i> &nbsp;Repost with comment</p>
          </div>
        </div>
        <div></div>
      </Modal>
        <Modal
          className='repost-item-modal-inner'
          isOpen={commentaryModalOpen}
          onRequestClose={closeCommentaryModal}
          style={customStylesSecond}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className='repost--modal--commentary'> 
            <div>
              <button className='repost--modal--commentary--close' onClick={closeCommentaryModal}>X</button>
            </div>
            <div className='repost--modal--commentary--header'>
              <form onSubmit={e => onSubmit(e)}>
                <div className='repost--modal--commentary--input'>
                  <img src={user !== null && user.avatar} />
                  <textarea
                    value={text}
                    placeholder='add a comment'
                    maxLength='250'
                    onChange={e => setText(e.target.value)}
                    required
                    ></textarea>
                </div>
                <div className='repost--modal--commentary--data'>
                  <div className='data--title'>
                    <img src={avatar} className='repost--avatar' />
                    <div className='textBox'>
                      <p>{name}</p>
                      <span>@{handle}</span>
                    </div>
                  </div>
                  <div className='data--repost--details'>
                    {image && description && commentary && <p>{commentary}</p>}
                      {image === undefined ? (
                        <Fragment>
                          <div className='data--text'>
                           <p>{commentary}...</p>
                          </div>            
                        </Fragment>
                      ) : (
                        <Fragment>
                          {image.length === 0 ? (
                          <Fragment>
                            <i className='fa fa-commenting article-image-missing'></i>
                          </Fragment>
                          ) : (
                          <Fragment>
                            <img src={image} className='repost--details--image'/>
                          </Fragment>
                          )}
                          {description !== undefined && (<p>{description.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').slice(0,150)}... ... <a href={url}>Read More</a></p>)}
                        </Fragment>
                      )}
                    </div>
                  </div>
                  <input onClick={closeCommentaryModal} type='submit'value='Repost'/>
                </form>
              </div>
            </div>
        </Modal>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);