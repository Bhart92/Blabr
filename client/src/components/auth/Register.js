import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';



const Register = ({ setAlert, register, isAuthenticated, profile: { profile } }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        handle: '',
        password: '',
        password2: ''
    });

    const {
        firstName,
        lastName,
        email,
        handle,
        password,
        password2
    } = formData;

    const onChange = e => setFormData({ ... formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('passwords dont match');
        } else{
            register({ firstName, lastName, email, handle, password });
        }
    };
    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <h1>Sign Up</h1>
            <p><i className="fas fa-user"></i> Create Your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={e => onChange(e)}
                
                />
                </div>
                <div>
                <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={e => onChange(e)}
                
                />
                </div>
                <div>
                <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                />
                <small
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
                </div>
                <div>
                <input
                type="text"
                placeholder="Handle"
                name="handle"
                value={handle}
                onChange={e => onChange(e)}
                
                />
                </div>
                <div>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    onChange={e => onChange(e)}
                    
                />
                </div>
                <div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    onChange={e => onChange(e)}
                    
                />
                <input type='submit' value='Register' />
                </div>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile
});


export default connect(mapStateToProps, { setAlert, register })(Register);