import React, {Fragment, useState} from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HamburgerMenu from 'react-hamburger-menu';

const MobileNav = () => {

const [isOpen, setIsOpen] = useState(false);
const [authActionsOpen, setAuthActionsOpen] = useState(false);

const toggleMobileNav = () => {
    setIsOpen(!isOpen);
    const nav = document.querySelector('.mobile-nav--dropDown-menu');
    const authActions = document.querySelector('.mobile-nav--dropDown-menu--auth-actions');
    nav.classList.toggle('visible');
    if(authActions.classList.contains('visible')) setAuthActionsOpen(false);
    authActions.classList.remove('visible');

};
const toggleAuthActions = ()=> {
    setAuthActionsOpen(!authActionsOpen);
    const authActions = document.querySelector('.mobile-nav--dropDown-menu--auth-actions');
    authActions.classList.toggle('visible');
}

return (
    <Fragment>
    <div className='mobile-nav'>
        <div className='mobile-nav--logo'>
        <Link to='/dashboard'>Chattr <i className='fa fa-commenting'></i></Link>
        </div>
        <div className='mobile-nav--burger-menu'>
        <HamburgerMenu 
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
    </div>
    <div>
        <div className='mobile-nav--dropDown-menu'>
        <HamburgerMenu 
            isOpen={authActionsOpen}
            menuClicked={toggleAuthActions}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color='black'
            borderRadius={0}
            animationDuration={0.5}/>
            <div className='mobile-nav--dropDown-menu--auth-actions'>

            </div>
        </div>
    </div>
    </Fragment>

    );
};



export default(MobileNav);