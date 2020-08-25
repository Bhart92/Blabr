import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import PostForm from '../posts/PostForm';
import DashboardProfileWidget from './DashboardProfileWidget';
import AdsWidget from '../posts/AdsWidget';
import {filterNewsByKeyword} from '../../actions/news';

const DashboardWidgets = ({
    auth: { user },
    filterNewsByKeyword
}) => {
    const [searchInput, setSearchInput] = useState('');

    const onChange = e => {
        setSearchInput(e.target.value);

    };
    const search = e => {
        console.log(searchInput)
        e.preventDefault();
        filterNewsByKeyword(searchInput);
    };
    return (
        <div className='dashboard--widgets'>

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

export default connect(mapStateToProps, {filterNewsByKeyword})(DashboardWidgets);