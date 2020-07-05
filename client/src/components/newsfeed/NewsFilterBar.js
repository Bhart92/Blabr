import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getNews, filterByCNN, filterByFox, filterByCBS, filterByBBC, filterByIndependent, filterByNBC } from '../../actions/news';


const NewsFilterBar = ({ 
    getNews,
    filterByCNN,
    filterByFox,
    filterByCBS,
    filterByBBC,
    filterBySports,
    filterByNBC,
    filterByIndependent,
    articles,
    news: {outlet}
 }) => {
    const filterArticles = articles.filter((item, index) => index === 0);
    return (
        <div className='newsFeed--newsFilterBar'>
            <div className='newsFeed--newsFilterBar--container'>
                <div className='newsFeed--newsFilterBar--header'>
                <span>Explore</span>
                <span>{outlet}</span>

                </div>
            <div className='newsFeed--newsFilterBar--buttons'>
                <ul>
                        <li id='trending' onClick={getNews}>Trending</li>
                        <li id='CNN'onClick={filterByCNN}>CNN</li>
                        <li id='FOX' onClick={filterByFox}>FOX</li>
                        <li id='CBS' onClick={filterByCBS}>CBS</li>
                        <li id='BBC' onClick={filterByBBC}>BBC</li>
                        <li id='NBC' onClick={filterByNBC}>NBC</li>
                        <li id='Independent' onClick={filterByIndependent}>Independent</li>

                </ul>
            </div>
            {filterArticles.map(item => (
            <div className='newsFeed--newsFilterBar--image' key={uuidv4()}>
                <div className='newsFeed--newsFilterBar--image__overlay'>
                    <div className='info-box'>
                    <p>{item.provider.name}: {item.author}</p>
                    <p>{item.title.split('').splice(0, 150)}...</p>
                    </div>

                </div>
                
                    <img src={item.image.url} />
                
            </div>
            ))}
            </div>
        </div>
    );
};

NewsFilterBar.propTypes = {
    getNews: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    news: state.news
});

export default connect(mapStateToProps,{ getNews, filterByIndependent, filterByCNN, filterByFox, filterByCBS, filterByBBC, filterByNBC })(NewsFilterBar);