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
      firstName: user !== null && user.firstName,
      lastName: user !== null && user.lastName,
      avatar: user !== null && user.avatar,
        company: '',
        websites: '',
        location: '',
        interests: '',
        status: '',
        website: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    });
    const [ displaySocialInputs, toggleSocialInputs] = useState(false);
    const {
      firstName,
      lastName,
      avatar,
        company,
        location,
        status,
        interests,
        bio,
        twitter,
        facebook,
        youtube,
        instagram
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
                  <div className='form-input-inner'>
                    <input type='text'  value={user.firstName} />
                    <small>
                      First name
                    </small>
                  </div>
                  <div className='form-input-inner'>
                    <input type='text'  value={user.lastName} />
                    <small>
                      Last name
                    </small>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='form-input-inner'>
                    <input type='text'  value={user.avatar} />
                    <small>
                    Gravatar profile link
                    </small>
                    </div>
                    <div className='form-input-inner'>
                    <input type='text' name='status' value={status} onChange={e => onChange(e)} />
                    <small>
                    What is your work title?
                    </small>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='form-input-inner'>
                    <input
                      type="text"
                      placeholder="Company"
                      name="company"
                      value={company}
                      onChange={e => onChange(e)}
                    />
                    <small>
                    Where do you work?
                    </small>
                  </div>
                <div className='form-input-inner'>
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={location}
                    onChange={e => onChange(e)}
                  />
                  <small>
                  City & state(eg. Boston, MA)
                  </small>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='form-input-inner'>
                    <input
                      className='interests--input'
                      type="text"
                      placeholder="* interests"
                      name="interests"
                      value={interests}
                      onChange={e => onChange(e)}
                    />
                    <small>
                    Some of your Interests (Comma separated list eg. Sports, Cooking, Fishing)
                    </small>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    placeholder="Tell us a little about yourself"
                    name="bio"
                    value={bio}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div >
                  <div className='form-input-inner'>
                    <button
                      className='display-social-links'
                      onClick={() => toggleSocialInputs(!displaySocialInputs)}
                      type="button"
                    >
                      Add Social Network Links
                    </button>
                    <span>Optional</span>
                    </div>
                </div>
                {displaySocialInputs && <Fragment>
                  <div className='social--inputs'>
                    <div>
                      <i className="fab fa-twitter" />
                      <input
                        type="text"
                        placeholder="Twitter URL"
                        name="twitter"
                        value={twitter}
                        onChange={e => onChange(e)}
                      />
                    </div>      
                    <div>
                      <i className="fab fa-facebook" />
                      <input
                        type="text"
                        placeholder="Facebook URL"
                        name="facebook"
                        value={facebook}
                        onChange={e => onChange(e)}
                      />
                    </div>
                    <div>
                      <i className="fab fa-youtube" />
                      <input
                        type="text"
                        placeholder="YouTube URL"
                        name="youtube"
                        value={youtube}
                        onChange={e => onChange(e)}
                      />
                    </div>
                    <div>
                      <i className="fab fa-instagram" />
                      <input
                        type="text"
                        placeholder="Instagram URL"
                        name="instagram"
                        value={instagram}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </div>
                </Fragment>
                }
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

