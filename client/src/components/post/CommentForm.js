import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/posts';

const CommentForm = ({ postId, addComment }) => {
    const [ text, setText ] = useState(' ');
return (
    <div className='comment--form'>
      <div>
        <h3>Leave a comment</h3>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Write a comment'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' value='Submit' className='comment-item--button' />
      </form>
    </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm);