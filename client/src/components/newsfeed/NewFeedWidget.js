import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsFilterBar from '../newsfeed/NewsFilterBar';
import NewsFeedItem from '../newsfeed/NewsFeedItem';
import { getCurrentProfile } from '../../actions/profile';
import { getNews } from '../../actions/news';
import Spinner from '../layout/Spinner';


const Newsfeed = ({ 
    getCurrentProfile,
    getNews,
    news: { articles }
 }) => {
     useEffect(() => {
        getNews();
        getCurrentProfile();
    },[getCurrentProfile, getNews]);

    console.log(articles)
    return (
       <div className='newsFeed--widget'>
           <div className='newsFeed--article-section__widget'>
            {articles.length === 0 ? <Spinner /> : (
                <Fragment>
                    <NewsFilterBar articles={articles}/>
                    <NewsFeedItem />
                </Fragment>
            )}
           </div>
       </div> 
    );
};

Newsfeed.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getNews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    news: state.news
});

export default connect(mapStateToProps,{ getCurrentProfile, getNews })(Newsfeed);