import React, { Fragment } from 'react';
import spinner from '../layout/spinner.gif';

export default () => (
  <div className='newsFeed--Spinner'>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
    <span>Loading articles...</span>
  </div>
);