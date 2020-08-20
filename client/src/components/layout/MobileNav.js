import React, {Fragment, useState} from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HamburgerMenu from 'react-hamburger-menu';

const MobileNav = () => {

const [isOpen, setIsOpen] = useState(false);

const toggleMobileNav = () => {
    setIsOpen(!isOpen);
};

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

        </div>
    </div>
    </Fragment>

    );
};



export default(MobileNav);