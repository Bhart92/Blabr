import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardPosts = ({ getPosts, profile: { profile }, post: { posts, loading } }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [seeMoreText, setSeeMoreText] = useState('See All');

  const toggleSeeMore = () => {
     setSeeMore(!seeMore); 
  }

const visitedPostArray = posts.filter(post => post.user == profile.user._id)
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <ul>
        {visitedPostArray && visitedPostArray.length <= 0 && <p> {profile.user.firstName} has made no posts yet</p>}
          {!seeMore ? (
            <Fragment>
              {visitedPostArray.slice(0, 6).map(item => {
                return <li key={item._id}>
                  {item.text && <Fragment>
                    <p>{item.text && item.text !== null || undefined ? item.text.substring(0, 15) : ''} </p>
                  </Fragment>}
                    {!item.text && item.commentary && <Fragment>
                      <p>{item.commentary && item.commentary !== null || undefined ? item.commentary.substring(0, 15) : ''} </p>
                    </Fragment>}
                    {!item.text && !item.commentary && <Fragment>
                      <p>{item.title && item.title !== null || undefined ? item.title.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').substring(0, 45) : ''} ...</p>
                    </Fragment>}
                    <Link to={`/posts/${item._id}`}>Read more</Link>
                    <p><Moment format='MM/DD/YYYY'>{item.date}</Moment></p>
                </li>
              })}
            </Fragment>
          ) : (
            <Fragment>
              {visitedPostArray.map(item => {
                return <li key={item._id}>
                  {item.text && <Fragment>
                    <p>{item.text && item.text !== null || undefined ? item.text.substring(0, 15) : ''} </p>
                  </Fragment>
                  }
                  {!item.text && item.commentary && <Fragment>
                    <p>{item.commentary && item.commentary !== null || undefined ? item.commentary.substring(0, 15) : ''} </p>
                  </Fragment>
                  }
                  {!item.text && !item.commentary && <Fragment>
                    <p>{item.title && item.title !== null || undefined ? item.title.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').substring(0, 45) : ''} ...</p>
                  </Fragment>
                  }
                  <Link to={`/posts/${item._id}`}>Read more</Link>
                  <p>{item.date}</p>
                </li>
              })}
            </Fragment>
          )}
      </ul>
      <div className='profile--posts-seeMore'>
      <span className='profile--posts--seeMore-btn' onClick={() => toggleSeeMore()}>
        <span>{!seeMore ? 'See All' : 'Hide'}</span>
      </span>
      </div>
    </div>
  );
};

DashboardPosts.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps
)(DashboardPosts);