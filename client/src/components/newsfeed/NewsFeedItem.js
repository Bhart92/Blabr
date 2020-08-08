import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNews } from '../../actions/news';
import { v4 as uuidv4 } from 'uuid';
import RepostArticleForm from '../posts/RepostArticleForm';


const NewsFeedItem = ({ isAuthenticated, getNews, auth: {user}, news: { articles } }) => {

    let filterArticles = articles.filter((item, index) => index !== 0);

    filterArticles.map((e) => {
        e.id = uuidv4()
    })
    console.log(filterArticles)
    //remove any duplicate objects in an array based off of the second parameter passed in
    function getUnique(arr, comparison) {

        // store the comparison  values in array
        const unique =  arr.map(e => e[comparison])

        // store the indexes of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the false indexes & return unique objects
        .filter((e) => arr[e]).map(e => arr[e]);

    return unique;
    }

    const triggerRepost = (item) => {
        console.log(item.title)
    }
    // if(user === null){
    //     console.log('user is null')
    // } else{
    //     console.log(user)

    // }

    return (
        <Fragment>
            {filterArticles.map(item => (
                    <div key={item.id} className='newsFeed--article--container'>
                        <div className='newsFeed--article--container--info'>
                        <p className='newsFeed--article--title'>{item.title.split('<b>').join('').split('[').join('').split('</b>').join('').split(']').join('')}</p>
                        <div className='button-container'>

                        {/* <Link onClick={e => triggerRepost(item)}><i class="fas fa-retweet"></i></button> */}
                        {isAuthenticated && <Fragment>
                            <RepostArticleForm user={user} article={item}/>
                            </Fragment>}
                        </div>
                        </div>
                        <div className='newsfeed--article--image'>
                        <a href={item.image.url}>
                            {!item.image.url ? <i className='fa fa-commenting article-image-missing'></i> : <img src={item.image.url} />}
                            <span>Read More...</span>
                        </a> 
                        </div>
                    </div>
               ))}
        </Fragment>
    );
};

NewsFeedItem.propTypes = {
    getNews: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    news: state.news,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated

});
export default connect(mapStateToProps, { getNews })(NewsFeedItem);