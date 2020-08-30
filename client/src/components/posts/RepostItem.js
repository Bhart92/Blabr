import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const RepostItem = ({
    text, url, repostHandle, title, repostAvatar, repostName, commentary, image, description, date
}) => {
  return <div className='repost'>
    {repostAvatar === undefined || null ? '' : (
      <div className='repost--OG-info'>
        <img className='repost--avatar' src={repostAvatar}/>
        <div className='repost--OG-info__names'>
          <p>{repostName}</p>
          <p>@{repostHandle}</p> &nbsp; 
        </div>
        <p className='repost--date'><Moment format='MMM/YY'>{date}</Moment></p>
      </div>
    )}
    {text !== undefined && text !== null && <p className='repost--commentary'>{commentary}</p>}

    {title && <p>{title.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('')}</p>}
    {image && image.length == 0 ? (
      <Fragment>
            {text !== undefined && text !== null && <p className='repost--commentary'>{commentary}</p>}
        <p>.....</p>
        <i className='fa fa-commenting article-image__missing'></i>
      </Fragment>
    ) : (
      <Fragment>
        <img src={image} className='repost--details--image'/>
      </Fragment>
    )}
    {description && <Fragment><p>{description.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').slice(0,150)}... <a href={url}>Read More</a></p></Fragment>}
  </div>;
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps
)(RepostItem);