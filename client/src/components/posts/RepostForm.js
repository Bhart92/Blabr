import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';
import Modal from 'react-modal';


const PostForm = ({ addPost, title, description, url, image, text }) => {
  const [repostModalOpen, setRepostModalOpen] = useState(false);
  function openRepostModal() {
    setRepostModalOpen(true);
  }
  
  function closeRepostModal(){
    setRepostModalOpen(false);
    }
    const customStyles = {
      content : {
        top                   : '63%',
        left                  : 'unset',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(100%, 3%)',
        borderRadius          : '50%!important'
      }
    };
const onSubmit = (e) => {
    e.preventDefault();

    addPost({ title, description, url, image, text });
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
            <div id='modal--container' className='modal--container'> 
                <div className='modal--header'>
                  Comment
                </div>
                <div className='modal--header'>
                  Comment 2
                </div>
            </div>
          <div>
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