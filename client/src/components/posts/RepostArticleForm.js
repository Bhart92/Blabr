import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';

const RepostArticleForm = ({ addPost, article }) => {
  const [text, setText] = useState('');
  const [repostModalOpen, setRepostModalOpen] = useState(false);
  function openRepostModal() {
    setRepostModalOpen(true);
  }
  
  function closeRepostModal(){
    setRepostModalOpen(false);
    }
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

      <i className="fas fa-retweet" onClick={e => onSubmit(e)}></i>
      
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