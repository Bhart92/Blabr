import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsFilterBar from '../newsfeed/NewsFilterBar';
import NewsFeedItem from '../newsfeed/NewsFeedItem';
import { getCurrentProfile } from '../../actions/profile';
import { filterByNY } from '../../actions/news';
import NewsSpinner from '../layout/NewsSpinner';


const Newsfeed = ({ 
    getCurrentProfile,
    filterByNY,
    user,
    news: { articles }
 }) => {
     useEffect(() => {
        filterByNY();
        getCurrentProfile();
    },[getCurrentProfile, filterByNY]);

    return (
<div className='post--container'>
    <div className='newsFeed--widget'>
            <div className='newsFeed--article-section__widget'>
                {articles.length === 0 ? (
                <div className='newsFeed-Spinner'>
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
    getCurrentProfile: PropTypes.func.isRequired,
    filterByNY: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    news: state.news,
    user: state.auth.user
});

export default connect(mapStateToProps,{ getCurrentProfile, filterByNY })(Newsfeed);