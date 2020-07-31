import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const RepostItem = ({
    text, url, repostHandle, title, repostAvatar, repostName, commentary, image, description, date
}) => {
// console.log(commentary)
return <div className='repost'>
    {repostAvatar === undefined || null ? '' : (
     <div className='repost-OG-info'>
       <img className='repost-avatar' src={repostAvatar}/>
       <div className='repost--OG--info__names'>
         <p>{repostName}</p>
         <p>@{repostHandle}</p> &nbsp; 
       </div>
       <p className='repost-date'><Moment format='MMM/YY'>{date}</Moment></p>
     </div>
     )}
     {text !== undefined && text !== null && <p>{commentary}</p>}

     <p>{title}</p>
     {image && (<Fragment><img className='repost-image' src={image} /></Fragment>)}
  
     {description && <Fragment><p>{description.slice(0,150)}... <a href={url}>Read More</a></p></Fragment>}
   </div>
      }


const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps
)(RepostItem);