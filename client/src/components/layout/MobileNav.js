import React, {Fragment, useState} from 'react';
import Proptypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import HamburgerMenu from 'react-hamburger-menu';
import { logout } from '../../actions/auth';

const MobileNav = ({
    auth: { user },
    logout
}) => {

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
            <div className='mobile-nav--links'>
                <ul>
                    <li onClick={toggleMobileNav}><NavLink exact to='/dashboard' activeClassName='active'><i className="fas fa-home"></i> Home</NavLink></li>
                    <li onClick={toggleMobileNav}><NavLink exact to='/explore' activeClassName='active' ><i className="fas fa-newspaper"></i> Explore</NavLink></li>
                    <li onClick={toggleMobileNav}><NavLink exact to='/posts' activeClassName='active' ><i className='fa fa-commenting commenting-NavLink--mobileNav'></i> Posts</NavLink></li>
                    <li onClick={toggleMobileNav}><NavLink exact to='/profiles' activeClassName='active' ><i className='fa fa-user'></i> People</NavLink></li>
                </ul>
            </div>
        <div className='mobile-nav--greeting-box'>
        {user.avatar ? (
                <div className='mobile-nav--greeting-box--image'>
                    <img src={user.avatar} />
                    <div className='dashboard--navBar-greeting-box--header'>
                        <span>Hello {user.firstName}</span>
                        <span>@{user.handle}</span>
                    </div>
                    <HamburgerMenu 
                    className='inner-burger'
            isOpen={authActionsOpen}
            menuClicked={toggleAuthActions}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color='black'
            borderRadius={0}
            animationDuration={0.5}/>
            </div>
            ) : (
                <div className='dashboard--navBar-greeting-box--no-image'>
                    <i className='fa fa-user'> </i>
                </div>
            )}
        </div>
            <div className='mobile-nav--dropDown-menu--auth-actions'>
            <div id='modal--container' className='modal--container mobile-modal'> 
                <div className='dashboard--modal--settings-container'>
                <div className='modal--settings'>
                    <span>Delete your account</span>
                </div>
                <div className='modal--settings'>
                <span onClick={toggleMobileNav}><Link to='edit-profile'>Edit your profile</Link></span>
                </div>
                <div className='modal--settings'>
                <span onClick={logout}>Logout</span>
                </div>
                </div>


            </div>
            </div>
        </div>
    </div>
    </Fragment>

    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });

  export default connect(mapStateToProps, { logout })(MobileNav);