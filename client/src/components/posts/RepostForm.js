import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';

const PostForm = ({ addPost, article }) => {
  const [text, setText] = useState('');

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
      <form
        className='form'
        onSubmit={e => onSubmit()}
      >
       <input type='submit' className='btn btn-dark my-1' value='Repost' onClick={e => onSubmit(e)}/>

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