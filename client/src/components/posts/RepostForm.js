import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';
import Modal from 'react-modal';


const PostForm = ({ addPost, title, user, avatar, handle, name, description, url, image, text }) => {
  const [repostModalOpen, setRepostModalOpen] = useState(false);
  const [commentaryModalOpen, setCommentaryModalOpen] = useState(false);
  const [commentary, setCommentary] = useState('');


// console.log(user.avatar)
  function openRepostModal() {
    setRepostModalOpen(true);
  }
  
  function closeRepostModal(){
    setRepostModalOpen(false);
    }
  function openCommentaryModal() {
    setCommentaryModalOpen(true);
    }
    
  function closeCommentaryModal(){
    setCommentaryModalOpen(false);
      }
    const customStyles = {
      content : {
        position              : 'fixed',
        top                   : '74%',
        left                  : 'unset',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(100%, 3%)',
        height                : '75px',
        width                 : '10%'
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
        height                : 'auto',
        width                 : '25%'
      }
    };
const onSubmit = (e) => {
    e.preventDefault();
    addPost({ title, handle, name, avatar, commentary, description, url, image, text });
}
  return (
    <div className='post-form'>

      <i className="fas fa-retweet" onClick={openRepostModal}></i>
      <Modal
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
          <div>
          </div>
        </Modal>
        <Modal
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
                    value={commentary}
                    placeholder='add a comment'
                    maxLength='250'
                    onChange={e => setCommentary(e.target.value)}
                    required
                    ></textarea>
                  </div>
                  <div className='repost--modal--commentary--data'>
                    <img src={avatar} />
                    <span>{name}</span>
                    <p>{text}</p>
                  </div>
                  <input type='submit'value='Repost'/>
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