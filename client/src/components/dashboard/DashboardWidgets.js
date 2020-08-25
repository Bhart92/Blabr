import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdsWidget from '../posts/AdsWidget';

const DashboardWidgets = () => {
    return (
        <div className='dashboard--widgets'>
            <div className='dashboard--widgets__posts'>
                <AdsWidget />
            </div>
        </div>
    );
};

export default DashboardWidgets;