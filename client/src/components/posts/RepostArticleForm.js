import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';
import Modal from 'react-modal';


const RepostArticleForm = ({ user, addPost, article, article: {url} }) => {
  const [text, setText] = useState('');
  const [repostModalOpen, setRepostModalOpen] = useState(false);
  const [commentaryModalOpen, setCommentaryModalOpen] = useState(false);
  const [commentary, setCommentary] = useState('');
  
  console.log(article)
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
    const articleObj = {
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.image.thumbnail,
      text: 'this this is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testis a test'
    }
    const {title, description, url, image, text} = articleObj;
    console.log(image)
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
                    <div className='data--text'>
                      <p>{text}</p>
                    </div>
                    <div className='data--repost--details'>
                    <img src={url} className='repost--details--image'/>
                      {/* {description !== undefined ? (<p>{description.slice(0,150)}... ... <a href={url}>Read More</a></p>) : (
                        <Fragment>
                          <p></p>
                        </Fragment>
                      )} */}
                    </div>
                  </div>
                  <input type='submit'value='Repost'/>
                </form>
              </div>
            </div>
        </Modal>
    </div>
  );
};

RepostArticleForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(RepostArticleForm);

/// CREATE REPOST ARTICLE WITH COMMENTARY ////////////////