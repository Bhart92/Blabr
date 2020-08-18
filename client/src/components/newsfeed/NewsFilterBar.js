import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import NewsSpinner from '../layout/NewsSpinner';

import { filterByCNN, filterByFox, filterByNY, filterByWashPo, filterByBBC, filterByIndependent, filterByBlaze } from '../../actions/news';


const NewsFilterBar = ({ 
    filterByNY,
    filterByCNN,
    filterByFox,
    filterByWashPo,
    filterByBBC,
    filterBySports,
    filterByBlaze,
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
                        <li id='trending' onClick={filterByNY}>NYTimes</li>
                        <li id='CNN'onClick={filterByCNN}>CNN</li>
                        <li id='FOX' onClick={filterByFox}>FOX</li>
                        <li id='CBS' onClick={filterByWashPo}>Wash.Post</li>
                        <li id='BBC' onClick={filterByBBC}>BBC</li>
                        <li id='NBC' onClick={filterByBlaze}>The Blaze</li>
                        <li id='Independent' onClick={filterByIndependent}>Independent</li>

                </ul>
            </div>
            {articles.length <= 0 ? (
            <Fragment>
                <NewsSpinner />
                </Fragment>
                ) : (
                <Fragment>
                    {filterArticles.map(item => (
                        <div className='newsFeed--newsFilterBar--image' key={uuidv4()}>
                            <div className='newsFeed--newsFilterBar--image__overlay'>
                                <div className='info-box'>
                                <p>{item.provider.name}: {item.author}</p>
                                <p>{item.title.split('<b>').splice(0, 150).join('').split('</b>').join('').split('[').join('').split(']').join('')}...</p>
                                </div>

                            </div>
                            
                                <img src={item.image.url} />
                            
                        </div>
            ))}
            </Fragment>
            )}
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    news: state.news
});

export default connect(mapStateToProps,{  filterByNY, filterByIndependent, filterByCNN, filterByFox, filterByWashPo, filterByBBC, filterByBlaze })(NewsFilterBar);