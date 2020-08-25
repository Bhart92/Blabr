import React, {  useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        <div className='login--box'>
            <p><i className="fas fa-user"></i> </p>
            <h1>Login</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                <input
                type="email"
                placeholder="Email Address"
                name="email"
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
                    onChange={e => onChange(e)}
                    required
                />
                </div>
                <input type="submit" className='login--button' value="Sign In" />
            </form>
            <div className='login--divider'>
                <span>OR</span>
            </div>
            <p className="my-1">
                <Link className='login--button' to="/register">Sign Up</Link>
            </p>
            <span className='login--footer'>&copy; 2020 Chattr</span>
        </div>
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