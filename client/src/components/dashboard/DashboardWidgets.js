import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import PostForm from '../posts/PostForm';
import DashboardProfileWidget from './DashboardProfileWidget';
import AdsWidget from '../posts/AdsWidget';

const DashboardWidgets = ({
    auth: { user }
}) => {
    const [searchInput, setSearchInput] = useState('');

    const onChange = e => {
        setSearchInput(e.target.value);

    };
    const search = e => {
        e.preventDefault();
        // filterNewsByKeyword(searchInput);
    };
    return (
        <div className='dashboard--widgets'>
            <div className='dashboard--widgets__search'>
                <input type='text' placeholder='Seach Chattr' value={searchInput} onChange={e => onChange(e)}/>
                <button type='submit' onClick={e => search(e)}>Search</button>
            </div>
            <div className='dashboard--widgets__posts'>
                <AdsWidget />
            </div>
        
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });

export default connect(mapStateToProps)(DashboardWidgets);