import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsFilterBar from '../newsfeed/NewsFilterBar';
import NewsFeedItem from '../newsfeed/NewsFeedItem';
import { filterByNY } from '../../actions/news';
import LoginBox from '../auth/LoginBox';
import NewsSpinner from './NewsSpinner';

const Newsfeed = ({ 
    user,
    filterByNY,
    news: {articles}
 }) => {
     useEffect(() => {
        filterByNY();
    },[filterByNY]);
    return articles.length <= 0 ? <NewsSpinner /> : (
       <div className='newsFeed'>
           <div className='newsFeed--article-section'>
                <Fragment>
                    <NewsFilterBar/>
                    <NewsFeedItem user={user}/>
                </Fragment>
           </div>
           <div className='login-box--container'>
            <LoginBox />
           </div>
       </div> 
    );
};

Newsfeed.propTypes = {
    filterByNY: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user,
    news: state.news
});

export default connect(mapStateToProps,{ filterByNY })(Newsfeed);