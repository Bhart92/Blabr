import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { createProfile } from '../../actions/profile';
import { Redirect } from 'react-router-dom';

const CreateProfile = ({user, createProfile, history, profile:{profile}}) => {
  console.log(profile)
    const [formData, setFormData] = useState({
      // firstName: user !== null && user.firstName,
      // lastName: user !== null && user.lastName,
      avatar: user !== null && user.avatar,
        company: '',
        websites: '',
        location: '',
        interests: '',
        status: '',
        website: '',
        bio: ''
    });
    const {
      firstName,
      lastName,
      avatar,
        company,
        location,
        status,
        interests,
        bio
    } = formData;

    const onChange = e => setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    });
    const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history);
    }
    if(profile !== null){
      return <Redirect to='/dashboard' />;
    } 
    return (
      <div className='post--container create--profile--container'>
        {user === null ? <Spinner /> : (
            <Fragment>
              <h1>Create your profile</h1>
              <small>* = required field</small>
              <form className='form' onSubmit={e => onSubmit(e)}>

                <div className='form-group'>

                </div>
                <input type="submit" />
                <Link to="/dashboard">
                  Go Back
                </Link>
              </form>
            </Fragment>
        )}
      </div>
    );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));

