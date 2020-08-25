import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';

const PostForm = ({ addPost }) => {
  const [commentary, setCommentary] = useState('');
  const [text, setText] = useState(null);
  return (
    <div className='post-form'>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addPost({ commentary });
          setCommentary('');
        }}
      >
        <textarea
        maxLength='280'
          name='commentary'
          cols='30'
          rows='5'
          placeholder='Share Something...'
          value={commentary}
          onChange={e => setCommentary(e.target.value)}
          required
        />
        <input type='submit' className='my-1' value='Submit' />
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