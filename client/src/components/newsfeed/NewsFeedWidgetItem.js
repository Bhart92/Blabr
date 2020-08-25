import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getUnique } from '../../actions/news';



const NewsFeedWidgetItem = ({ getUnique, news: { articles } }) => {
    let filterArticles = articles.filter((item, index) => index !== 0);
    filterArticles.map((e) => {
        e.id = uuidv4()
    })
    return (
        <Fragment>
            {filterArticles.map(item => (
                    <div key={item.id} className='newsFeed--article--container'>
                        <div className='newsFeed--article-info--container'>
                        <p className='newsFeed--article-title'>{item.title}</p>
                        <div className='button-container'>
                        <button><i className='fa fa-commenting'></i></button><button><i className='fas fa-thumbs-up'></i></button>
                        </div>
                        </div>
                        <div className='newsfeed--article-image'>
                        <a href={item.image.url}>
                            {!item.image.url ? <i className='fa fa-commenting article-image__missing'></i> 
                            : 
                            <img src={item.image.url} />
                            }
                            <span>Read More...</span>
                        </a> 
                        </div>
                    </div>
               ))}
        </Fragment>
    );
};
NewsFeedWidgetItem.propTypes = {
}
const mapStateToProps = state => ({
    news: state.news
});
export default connect(mapStateToProps)(NewsFeedWidgetItem);