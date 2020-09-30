import React, { Fragment, useState } from 'react';
import Modal from 'react-modal';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';

const Register = ({ modalIsOpen, setIsOpen, setAlert, register, isAuthenticated }) => {
    function openModal() {
          setIsOpen(true);
    }
    function closeModal(){
            setIsOpen(false);
    }
    const customStyles = {
        content : {
          position              : 'fixed',
          top                   : '50%',
          left                  : '50%',
          transform             : 'translate(-50%, -50%)'
        }
    };
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        handle: '',
        password: '',
        password2: '',
        company: '',
        location: '',
        interests: '',
        title: '',
        bio: ''
    });

    const {
        fullName,
        email,
        handle,
        password,
        password2,
      company,
      location,
      title,
      interests,
      bio
    } = formData;

    const onChange = e => setFormData({ ... formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('passwords dont match');
        } else{
            console.log(formData)
            register({ fullName, email, handle, password, bio, company, interests, location, title });
        }
    };
    const slideSwap = () => {
        const modals = document.querySelectorAll('.modal--container');
        Array.from(modals).map((slide) => {
            slide.classList.toggle('activeSlide');
        })
    }   
    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (

<Fragment>
<Modal
            className='register--modal'
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div id='modal--container' className='modal--container activeSlide'> 
            <i className='fa fa-commenting'></i>

                 <div className='modal--container--form'>
                     <form onSubmit={e => onSubmit(e)}>
                     <h1>Create An Account</h1>
                     <div className='register--input-box__small'>
                            <span className='register--button' onClick={() => slideSwap()}>Next</span>
                        </div>

                        
                         <div className='register--input-box'>
                         <input
                            type="text"
                            placeholder="Name"
                            name="fullName"
                            value={fullName}
                            onChange={e => onChange(e)}
                        />
                        </div>

                        <div className='register--input-box'> 
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                        />
                        </div>
                        <div className='register--input-box'> 
                        <input
                            type="text"
                            placeholder="Handle"
                            name="handle"
                            value={handle}
                            onChange={e => onChange(e)}
                        />
                        </div>
                        <div className='register--input-box'>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            onChange={e => onChange(e)}
                        />
                        </div>
                        <div className='register--input-box'>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            onChange={e => onChange(e)}      
                        />
                        </div>
                        <p className="register--footer">
                    <small>Create a Gravatar account to attach a profile image.</small>
                    <p>Already have an account? <Link className='login--button' to="/login">Sign In</Link></p>
                </p>
                    </form>
                </div>

            </div>
            <div id='modal--container' className='modal--container'> 
            <i className='fa fa-commenting'></i>

                 <div className='modal--container--form'>
                     <form onSubmit={e => onSubmit(e)}>
                     <h1>Create An Account</h1>
                     <div className='register--input-box__small'>
                            <span className='register--button' onClick={() => slideSwap()}>Back</span>
                        </div>                        

                        <div className='register--input-box'> 
                        <input type='text'
                        name='title'
                        placeholder='Job Title'
                        value={title}
                        onChange={e => onChange(e)}
                        />
                        </div>

                        <div className='register--input-box'> 
                        <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={company}
                            onChange={e => onChange(e)}
                            />
                        </div>


                        <div className='register--input-box'>
                            <input
                                type="text"
                                placeholder="Location"
                                name="location"
                                value={location}
                                onChange={e => onChange(e)}
                            />
                        </div>


                        <div className='register--input-box'>
                            <input
                            className='interests--input'
                            type="text"
                            placeholder="* interests"
                            name="interests"
                            value={interests}
                            onChange={e => onChange(e)}
                            />
                        </div>
                        <div className='register--input-box'>
                            <textarea
                                placeholder="Tell us a little about yourself"
                                name="bio"
                                value={bio}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className='register--input-box__bottom'>
                            <input className='register--button' type='submit' value='Register' />
                        </div>
                    </form>
                </div>

            </div>
        <div>
    </div>
    </Modal>
</Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile
});

export default connect(mapStateToProps, { setAlert, register })(Register);