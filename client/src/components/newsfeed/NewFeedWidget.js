import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewsFilterBar from './NewsFilterBar';
import NewsFeedItem from './NewsFeedItem';
import NewsSpinner from './NewsSpinner';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { filterByNY } from '../../actions/news';

const Newsfeed = ({ 
    filterByNY,
    getCurrentProfile,
    user,
    news: { articles }
 }) => {
    useEffect(() => {
        getCurrentProfile();
        filterByNY();
    },[filterByNY, getCurrentProfile]);
    return (
<div className='post--container'>
    <div className='newsFeed--widget'>
        <div className='newsFeed--article-section__widget'>
            {articles.length === 0 ? (
                <div className='newsFeed--Spinner'>
                    <NewsSpinner />
                </div>
                ) : (
                    <Fragment>
                        <NewsFilterBar articles={articles}/>
                        <NewsFeedItem user={user}/>
                    </Fragment>
            )}
        </div>
    </div>
</div> 
    );
};

Newsfeed.propTypes = {
    filterByNY: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    news: state.news,
    user: state.auth.user
});

export default connect(mapStateToProps,{ filterByNY, getCurrentProfile })(Newsfeed);