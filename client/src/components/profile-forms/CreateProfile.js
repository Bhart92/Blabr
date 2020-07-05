import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { createProfile } from '../../actions/profile';
import { Redirect } from 'react-router-dom';

const CreateProfile = ({isAuthenticated, createProfile, history, profile:{profile}}) => {
    const [formData, setFormData] = useState({
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
    <Fragment>
      <h1>Profile Details</h1>
      <small>* = required field</small>
      <form onSubmit={e => onSubmit(e)}>
      <div className='form-group'>
          <input type='text' name='status' value={status} onChange={e => onChange(e)} />
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div>
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
          <small>
            Could be your own company or one you work for
          </small>
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div>
          <input
            type="text"
            placeholder="* interests"
            name="interests"
            value={interests}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <small>Tell us a little about yourself</small>
        </div>

        <div >
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && <Fragment>
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
            </Fragment>}

        <input type="submit" />
        <Link to="/dashboard">
          Go Back
        </Link>
      </form>
        </Fragment>

    );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));

