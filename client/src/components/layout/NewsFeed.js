import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsFilterBar from '../newsfeed/NewsFilterBar';
import NewsFeedItem from '../newsfeed/NewsFeedItem';
import { getCurrentProfile } from '../../actions/profile';
import { filterByNY } from '../../actions/news';
import LoginBox from '../auth/LoginBox';


const Newsfeed = ({ 
    getCurrentProfile,
    user,
    filterByNY,
    news: { articles }
 }) => {
     useEffect(() => {
        filterByNY();
        getCurrentProfile();
    },[getCurrentProfile, filterByNY]);
    console.log(articles)
    return (
       <div className='newsFeed'>
           <div className='newsFeed--article-section'>
                <Fragment>
                    <NewsFilterBar articles={articles}/>
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
    getCurrentProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    news: state.news,
    user: state.auth.user
});

export default connect(mapStateToProps,{ getCurrentProfile, filterByNY })(Newsfeed);