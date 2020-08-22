import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

 const onChange = e => setFormData({... formData,[e.target.name]:e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };
    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to='/dashboard' />;
    }
    return (
        <div className='auth--form--container'>
        <Navbar />
        <div className='post--container register--container'>
            <h1 className='login--title'>Login</h1>
            <form className='login--form--page' onSubmit={e => onSubmit(e)}>
                <div>
                <input
                type="email"
                placeholder="Email Address"
                name="email"
                className='input--box'
                value={email}
                onChange={e => onChange(e)}
                required/>
                </div>
                <div>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    className='input--box'
                    onChange={e => onChange(e)}
                    required
                />
                </div>
                <input type="submit" className='loginButton' value="Sign In" />
            </form>
            <p className="my-1">
                <Link className='loginButton' to="/login">Sign Up</Link>
            </p>
        </div>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);