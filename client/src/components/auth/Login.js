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
        <Fragment>
            <Navbar />
            <div className='auth--container'>
                <div className='post--container login--container'>
                    <h1 className='login--title'>Login</h1>
                    <form className='login--input-container' onSubmit={e => onSubmit(e)}>
                        <div>
                        <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        className='login--input-box'
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
                            className='login--input-box'
                            onChange={e => onChange(e)}
                            required
                        />
                        </div>
                        <input type="submit" className='login--button' value="Sign In" />
                    </form>
                    <p className="my-1">
                        <Link className='login--button' to="/login">Sign Up</Link>
                    </p>
                </div>
            </div>
        </Fragment>

    );
};
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);