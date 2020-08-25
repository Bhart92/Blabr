import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HamburgerMenu from 'react-hamburger-menu';

const NewsfeedBurgerMenu =({isOpen, toggleMobileNav}) => {

    
    return (
        <div className='newsfeed--filter--burger-menu--container'>
        <HamburgerMenu 
            className='newsfeed--filter--burger-menu'
            isOpen={isOpen}
            menuClicked={toggleMobileNav}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color='black'
            borderRadius={0}
            animationDuration={0.5}/>
 
        </div>
    );
}

export default NewsfeedBurgerMenu;