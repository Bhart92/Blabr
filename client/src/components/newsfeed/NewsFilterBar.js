import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import NewsfeedBurgerMenu from './NewsfeedBurgerMenu';
import { filterByCNN, filterByFox, filterByNY, filterByWashPo, filterByBBC, filterByIndependent, filterByBlaze } from '../../actions/news';
const NewsFilterBar = ({ 
    filterByNY,
    filterByCNN,
    filterByFox,
    filterByWashPo,
    filterByBBC,
    filterByBlaze,
    filterByIndependent,
    news: {outlet, articles}
 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMobileNav = () => {
        setIsOpen(!isOpen);  
        const filterModal = document.querySelector('.newsfeed--filter--burger-modal');
        const buttonBar = document.querySelector('.newsFeed--newsFilterBar-buttons');
        filterModal.classList.toggle('visible');
        buttonBar.classList.toggle('overFlowUnset');
    };
    const filterArticles = articles.filter((article, index) => index === 0);
    return (
        <div className='newsFeed--newsFilterBar'>
            <div className='newsFeed--newsFilterBar--container'>
                <div className='newsFeed--newsFilterBar-header'>
                <span>Explore</span>
                <span>{outlet}</span>
                </div>
            <div className='newsFeed--newsFilterBar-buttons'>
                {articles.length <= 0 ? '' : <NewsfeedBurgerMenu toggleMobileNav={toggleMobileNav} isOpen={isOpen}/>}
                <div className='newsfeed--filter--burger-modal'>
                    <ul className='newsfeed--filter--burger-modal__mobile'>
                            <li id='trending' onClick={filterByNY}>NYTimes</li>
                            <li id='CNN'onClick={filterByCNN}>CNN</li>
                            <li id='FOX' onClick={filterByFox}>FOX</li>
                            <li id='CBS' onClick={filterByWashPo}>Wash.Post</li>
                            <li id='BBC' onClick={filterByBBC}>BBC</li>
                            <li id='NBC' onClick={filterByBlaze}>The Blaze</li>
                            <li id='Independent' onClick={filterByIndependent}>Independent</li>
                    </ul> 
                </div>
                <ul className=''>
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
                
                </Fragment>
                ) : (
                <Fragment>
                    {filterArticles.map(article => (
                        <div className='newsFeed--newsFilterBar-image' key={uuidv4()}>
                            <div className='newsFeed--newsFilterBar-image__overlay'>
                                <div className='newsFeed--newsFilterBar-info-box'>
                                <p>{article.provider.name}: {article.author}</p>
                                <p>{article.title.split('<b>').splice(0, 150).join('').split('</b>').join('').split('[').join('').split(']').join('')}...</p>
                                </div>
                            </div>                
                            {!article.image.url ? <a href={article.url}><i className='fa fa-commenting article-image__missing'></i></a> : <a href={article.url}><img src={article.image.url} /></a>}                         </div>
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