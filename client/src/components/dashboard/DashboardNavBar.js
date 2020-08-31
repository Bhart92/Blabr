import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import PostForm from '../posts/PostForm';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { deleteAccount } from '../../actions/profile';

const DashboardNavBar = ({
    auth: { user },
    logout,
    profile: {profile},
    deleteAccount
}) => {
    const customStyles = {
        content : {
          position              : 'fixed',
          top                   : 'unset',
          left                  : '15%',
          right                 : 'unset',
          bottom                : '10%',
          marginRight           : '-50%',
          height                : '250px',
          padding               : '15px 0 0 0',
          transform             : 'translate(-25%, 2%)',
          borderRadius         : '10px'
        }
    };
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
          setIsOpen(true);
    }
    function closeModal(){
            setIsOpen(false);
    }
    return user === null ? '' : <div className='dashboard--navbar'>
        <div className='dashboard--navBar-icon'>
        <Link to='/dashboard'>Blabr <i className='fa fa-commenting'></i></Link>
        </div>
        <div className='dashboard--navBar-list'>
                {profile === null && user ? (
                    <Fragment>
                        <ul className='dashboard--navBar--no-profile'>
                            <li><NavLink exact to='/dashboard' activeClassName='active'><i className="fas fa-home"></i> Home</NavLink></li>
                            <li><NavLink exact to='/create-profile' activeClassName='active' ><i className="fas fa-newspaper"></i> Create Profile</NavLink></li>
                        </ul>
                    </Fragment>
                ) : (
                    <Fragment>
                        <ul>
                            <li><NavLink exact to='/dashboard' activeClassName='active'><i className="fas fa-home"></i> Home</NavLink></li>
                            <li><NavLink exact to='/explore' activeClassName='active' ><i className="fas fa-newspaper"></i> Explore</NavLink></li>
                            <li><NavLink exact to='/posts' activeClassName='active' ><i className='fa fa-commenting'></i> Posts</NavLink></li>
                            <li><NavLink exact to='/profiles' activeClassName='active' ><i className='fa fa-user'></i> People</NavLink></li>
                        </ul>
                    </Fragment>
                )}
        </div>
        <div className='dashboard--navBar--greeting-box'>
        {user.avatar ? (
                <div className='dashboard--navBar--greeting-box__image'>
                    <img src={user.avatar} />
                    <div className='dashboard--navBar--greeting-box__header'>
                        <span>Hello {user.firstName}</span>
                        <span>{user.handle}</span>
                    </div>
                    <i className='fas fa-angle-down' onClick={openModal}></i>
                </div>
            ) : (
                <div className='dashboard--navBar--greeting-box__no-image'>
                    <i className='fa fa-user'> </i>
                </div>
            )}

        <Modal
            className='dashboard--navBar--modal'
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
                <div id='modal--container' className='modal--container'> 
                    <div className='modal--header'>
                        <img src={user.avatar} />
                        <div className='title'>
                        <span>{user.firstName} {user.lastName}</span>
                            <span>{user.handle}</span>
                        </div>
                        <div className='dashboard--modal--close-button'>
                            <button onClick={closeModal}>X</button>
                        </div>
                    </div>
                    <div className='dashboard--modal--settings-container'>
                    <div className='modal--settings'>
                        <span onClick={e => deleteAccount(user._id)}>Delete your account</span>
                    </div>
                    <div className='modal--settings'>
                    <span onClick={closeModal}><Link to='edit-profile'>Edit your profile</Link></span>
                    </div>
                    <div className='modal--settings'>
                    <span onClick={logout}>Logout</span>
                    </div>
                    </div>
                </div>
                <div></div>
            </Modal>
        </div>    
    </div>;
};
DashboardNavBar.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });

export default connect(mapStateToProps, { logout, deleteAccount })(DashboardNavBar);