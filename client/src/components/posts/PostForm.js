import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';

const PostForm = ({ addPost, user }) => {
  const [commentary, setCommentary] = useState('');
  const [text, setText] = useState(null);
  return (
    <div className='post-form'>
      <div className='post-form-avatar'>
        <img src={user.avatar} />
      </div>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addPost({ commentary });
          setCommentary('');
        }}
      >
        <textarea
        contenteditable
          maxLength='280'
          name='commentary'
          cols='30'
          rows='5'
          placeholder='Share Something...'
          value={commentary}
          onChange={e => setCommentary(e.target.value)}
          required
        />
          <div className='post--container--form--icons'>
            <div>
              <i className="fas fa-home"></i>
              <i className="fas fa-home"></i>
              <i className="fas fa-home"></i>
              <i className="fas fa-home"></i>
              <i className="fas fa-home"></i>
            </div>
            <div>
              <input type='submit' value='Blab' />
           </div>
          </div>

      </form>
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