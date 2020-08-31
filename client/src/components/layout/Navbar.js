import React, { Fragment, useState } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul className='navBar--navLinks'>
            <li>
                <Link to='/dashboard'>
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to='/posts'>
                    Posts
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt'>{' '}</i>
                    Logout
                </a>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul className='navBar--navLinks'>
            <li>
                <Link to='/login'>
                    Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    Register
                </Link>
            </li>
        </ul>
    );
 
    return (
        <nav id='navBar' className='navBar'>
            <div className='navBar--container'>
            <h1 className='navBar--h1'>
                <Link to={isAuthenticated ? '/dashboard' : '/'}>Blabr <i className='fa fa-commenting'></i><span className='navBar--h1__span'>Share. Discuss. Debate.</span></Link>
            </h1>
            {!loading && (<Fragment>
                { isAuthenticated ? authLinks : guestLinks }
            </Fragment>)}
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropType.func.isRequired,
    auth: PropType.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);