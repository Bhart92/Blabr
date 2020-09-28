import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { login } from '../../actions/auth';
import Register from './Register';
import Alert from '../layout/Alert';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [modalIsOpen, setIsOpen] = useState(false);

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
        <Alert />
        <section className='login'>
           <i className='fa fa-commenting'></i>
           <h1 className='login--title'>Log in to Blabr</h1>
           <form onSubmit={onSubmit}>
                            <div className='login--input-container'>
                                <label>
                                <div className='login--input-label'>
                                        <span>
                                        Email:
                                        </span>
                                    </div>
                                    <div>
                                    <input type='email' name='email' onChange={onChange} required/>
                                    </div>
                                </label>
                            </div>
                            <div className='login--input-container'>
                                <label>
                                    <div className='login--input-label'>
                                        <span>
                                        Password:
                                        </span>
                                    </div>
                                    <div>
                                    <input type='password' name='password' onChange={onChange} required/>
                                    </div>
                                </label>
                            </div>
                            <div className='login--submit-container'>
                                    <div>
                                        <input type='submit' value='Log in'></input>
                                    </div>
                            </div>
                        </form>
                    <p className="login--sign-up">
                        <Link className='login--button' to="/">Go Back</Link>
                        <span className='spanLink' onClick={() => setIsOpen(true)}>Sign Up</span>
                    </p>
                    <Register modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        </section>
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