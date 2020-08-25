import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProfileWidgetItem = ({ profile, user }) => {
  return user === null ? '' :(
    <Fragment>
                <div key={user.id} className='profile--widget-item'>
                    <h1>{user.name}</h1>
                    <div className='profile--widget-item-info'>
                      <img className='profile--widget-item-image' src={user.avatar} />
                        <p>{profile.status} at {profile.company}</p>
                    </div>
                </div>
                </Fragment>
  );
};

ProfileWidgetItem.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};


export default ProfileWidgetItem;