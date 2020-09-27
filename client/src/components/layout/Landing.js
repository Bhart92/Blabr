import React, { Fragment, useState } from 'react';
import Proptypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from './Alert';
import Footer from './Footer';
import Register from '../auth/Register';



const Landing = ({isAuthenticated}) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <section className='landing'>
            <Alert />
            <div className='landing--hero-right'>
                <div className='landing--hero-right--login-box'>
                    <div className='landing--hero-right--login-box--inner'>
                        <form>
                            <div className='landing--hero-right--input-container'>
                                <label>
                                <div className='landing--hero-right--input-label'>
                                        <span>
                                        Email:
                                        </span>
                                    </div>
                                    <div>
                                        <input type='email' required/>
                                    </div>
                                </label>
                            </div>
                            <div className='landing--hero-right--input-container'>
                                <label>
                                    <div className='landing--hero-right--input-label'>
                                        <span>
                                        Password:
                                        </span>
                                    </div>
                                    <div>
                                        <input type='text' required/>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <input type='submit' value='Log in'></input>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='landing--hero-right--center-box'>
                    <i className='fa fa-commenting'></i>
                    <div className='landing--hero-right--center-box--inner'>
                        <h1>See what's happening in the world right now</h1>
                        <div><span>Join Blabr Today!</span></div>
                        <span className='spanLink' onClick={() => setIsOpen(true)}>Sign Up</span>
                        <Link to='/login'>Log In</Link>
                    </div>
                </div>
            </div>
            <div className='landing--hero-left'>
                <div className='landing--hero-left--inner'>
                    <i className='fa fa-commenting'></i>
                </div>
                <div className='landing--hero-left--box'>
                    <div className='landing--hero-left--box-item'><i class="far fa-newspaper"></i><span>Share interesting news.</span></div>
                    <div className='landing--hero-left--box-item'><i class="far fa-comments"></i><span>Discuss hot topics.</span></div>
                    <div className='landing--hero-left--box-item'><i class="fas fa-user-friends"></i><span>Meet new friends.</span></div>
                </div>
            </div>
            <Footer />
            <Register modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        </section>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);