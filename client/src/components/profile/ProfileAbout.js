
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    interests,
    user: { name }
  }
}) => (
  <div>
    {bio && (
      <Fragment>
        <h2>{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
        <div />
      </Fragment>
    )}
    <h2>Skill Set</h2>
    <div>
      {interests.map((interest, index) => (
        <div key={index}>
          <i className='fas fa-check' /> {interest}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;