  import React, { Fragment } from 'react';
  import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='post--container'>
      <div className='page-not-found'>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large'>Sorry, this page does not exist</p>
      <Link to='/'>Go Back </Link>
      </div>
    </div>
  );
};

export default NotFound;