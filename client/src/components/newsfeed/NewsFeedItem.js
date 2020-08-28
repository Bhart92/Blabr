import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RepostArticleForm from '../posts/RepostArticleForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByNY, getUnique } from '../../actions/news';
import { v4 as uuidv4 } from 'uuid';

const NewsFeedarticle = ({ isAuthenticated, profile: {profile}, auth: {user}, news: { articles } }) => {
    let filterArticles = articles.filter((article, index) => index !== 0);
    filterArticles.map((e) => {
        e.id = uuidv4()
    })
    return (
        <Fragment>
            {filterArticles.map(article => (
                    <div key={article.id} className='newsFeed--article--container'>
                        <div className='newsFeed--article-info--container'>
                        <p className='newsFeed--article-title'>{article.description.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('').substring(0, 60)}...</p>
                        <div className='button-container'>
                        {isAuthenticated && profile !== null && <Fragment>
                            <RepostArticleForm user={user} article={article}/>
                            </Fragment>}
                        </div>
                        </div>
                        <div className='newsfeed--article-image'>
                        <a href={article.image.url}>
                            {!article.image.url ? <a href={article.url}><i className='fa fa-commenting article-image__missing'></i></a> : <a href={article.url}><img src={article.image.url} /></a>}
                            <a href={article.url}><span>Read More...</span></a>
                        </a> 
                        </div>
                    </div>
               ))}
        </Fragment>
    );
};
NewsFeedarticle.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    news: state.news,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile
});
export default connect(mapStateToProps)(NewsFeedarticle);