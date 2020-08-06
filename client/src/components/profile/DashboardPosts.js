import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

const DashboardPosts = ({ getPosts, user, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const [seeMore, setSeeMore] = useState(false);
  const [seeMoreText, setSeeMoreText] = useState('See All');


  const toggleSeeMore = () => {
     setSeeMore(!seeMore); 
  }
const userPostArray = posts.filter(post => post.user == user._id)
  console.log(userPostArray)
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <ul>

    {!seeMore ? (
      <Fragment>
      {userPostArray.slice(0, 6).map(item => {
            return <li key={item._id}>

            {item.text && <Fragment>
                <p>{item.text && item.text !== null || undefined ? item.text.substring(0, 50) : ''} </p>
              </Fragment>}
              {!item.text && item.commentary && <Fragment>
                <p>{item.commentary && item.commentary !== null || undefined ? item.commentary.substring(0, 50) : ''} </p>
              </Fragment>}
              {!item.text && !item.commentary && <Fragment>
                <p>{item.title && item.title !== null || undefined ? item.title.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').substring(0, 45) : ''} ...</p>
              </Fragment>}
                <Link to={`/posts/${item._id}`}>Read more</Link>
                <p><Moment format='MM/YYYY'>{item.date}</Moment></p>
            </li>
        })}
      </Fragment>
    ) : (
      <Fragment>
              {userPostArray.map(item => {
            return <li key={item._id}>

            {item.text && <Fragment>
                <p>{item.text && item.text !== null || undefined ? item.text.substring(0, 50) : ''} </p>
              </Fragment>}
              {!item.text && item.commentary && <Fragment>
                <p>{item.commentary && item.commentary !== null || undefined ? item.commentary.substring(0, 50) : ''} </p>
              </Fragment>}
              {!item.text && !item.commentary && <Fragment>
                <p>{item.title && item.title !== null || undefined ? item.title.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').substring(0, 45) : ''} ...</p>
              </Fragment>}
                <Link to={`/posts/${item._id}`}>Read more</Link>
                <p><Moment format='MM/YYYY'>{item.date}</Moment></p>
            </li>
        })}
      </Fragment>
    )}


      </ul>
      <span className='profile--posts-seeMore--btn' onClick={() => toggleSeeMore()}>
        {!seeMore ? 'See All' : 'Hide'}
        </span>
    </div>
  );
};

DashboardPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  user:state.auth.user
});

export default connect(
  mapStateToProps,
  { getPosts }
)(DashboardPosts);