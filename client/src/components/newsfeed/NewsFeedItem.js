import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByNY, getUnique } from '../../actions/news';
import { v4 as uuidv4 } from 'uuid';
import RepostArticleForm from '../posts/RepostArticleForm';

const NewsFeedItem = ({ isAuthenticated, filterByNY, getUnique, auth: {user}, news: { articles } }) => {
    let filterArticles = articles.filter((item, index) => index !== 0);
    filterArticles.map((e) => {
        e.id = uuidv4()
    })
    const triggerRepost = (item) => {
        console.log(item.title)
    }
    return (
        <Fragment>
            {filterArticles.map(item => (
                    <div key={item.id} className='newsFeed--article--container'>
                        <div className='newsFeed--article-info--container'>
                        <p className='newsFeed--article-title'>{item.description.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').substring(0, 60)}...</p>
                        <div className='button-container'>
                        {isAuthenticated && <Fragment>
                            <RepostArticleForm user={user} article={item}/>
                            </Fragment>}
                        </div>
                        </div>
                        <div className='newsfeed--article-image'>
                        <a href={item.image.url}>
                            {!item.image.url ? <a href={item.url}><i className='fa fa-commenting article-image__missing'></i></a> : <a href={item.url}><img src={item.image.url} /></a>}
                            <a href={item.url}><span>Read More...</span></a>
                        </a> 
                        </div>
                    </div>
               ))}
        </Fragment>
    );
};
NewsFeedItem.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    news: state.news,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated

});
export default connect(mapStateToProps)(NewsFeedItem);