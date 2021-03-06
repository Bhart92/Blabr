import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <Link to='/edit-profile'>
        <i className='fas fa-user-circle'/> Edit Profile
      </Link>
      <Link to='/add-experience'>
        <i className='fab fa-black-tie' /> Add Experience
      </Link>
      <Link to='/add-education'>
        <i className='fas fa-graduation-cap' /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;