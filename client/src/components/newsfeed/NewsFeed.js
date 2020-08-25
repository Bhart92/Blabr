import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsFilterBar from '../newsfeed/NewsFilterBar';
import NewsFeedItem from '../newsfeed/NewsFeedItem';
import { getCurrentProfile } from '../../actions/profile';
import { filterByNY } from '../../actions/news';
import LoginBox from '../auth/LoginBox';


const Newsfeed = ({ 
    user,
    filterByNY
 }) => {
     useEffect(() => {
        filterByNY();
    },[filterByNY]);
    return (
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
    user: state.auth.user
});

export default connect(mapStateToProps,{ filterByNY })(Newsfeed);