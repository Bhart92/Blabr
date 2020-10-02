import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import PostForm from '../posts/PostForm';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { deleteAccount } from '../../actions/profile';

const DashboardNavBar = ({
    user,
    logout,
    deleteAccount
}) => {
    const bottomModal = {
        content : {
          position              : 'fixed',
          top                   : 'unset',
          left                  : '330px',
          right                 : 'unset',
          bottom                : '70px',
          height                : '189px',
          width                 : '300px',
          background            : '#FFF',
          borderRadius          : '25px',
          boxShadow             : 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
        }
    };
    const topModal = {
        content : {
            top                   : '50%',
            left                  : '50%',
            minWidth              : '550px',
            maxWidth              :'650px',
            minHeight             : '375px',
            maxHeight             : '425px',
            height                : '400px',
            width                 : '600px',
            zIndex                : '50',
            background            : '#FFF',
            borderRadius          : '25px',
            boxShadow             : 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
        }
    };
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
          setIsOpen(true);
    }
    function closeModal(){
            setIsOpen(false);
    }




    const [modalTwoIsOpen, setTwoIsOpen] = useState(false);

    function openModalTwo() {
        setTwoIsOpen(true);
  }
    function closeModalTwo(){
        setTwoIsOpen(false);
}
    return <Fragment>
        <Fragment>
        <Modal
            className='dashboard-tweet--modal'
            isOpen={modalTwoIsOpen}
            onRequestClose={closeModalTwo}
            style={topModal}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
                <div id='modal--container' className='tweet-comment--modal'> 

                </div>
        </Modal>
        </Fragment>
        <header>
        <div className='dashboard--navbar'>
        <div className='dashboard--navBar-icon'>
            <Link to='/dashboard'><i className='fa fa-commenting'></i></Link>
        </div>
        <div className='dashboard--navBar-list'>
                        <ul>
                            <li><NavLink exact to='/dashboard' activeClassName='active' ><i className="fas fa-home"></i> Home</NavLink></li>
                            <li><NavLink exact to='/posts' activeClassName='active' ><i className='fa fa-hashtag'></i> Explore</NavLink></li>
                            <li><NavLink exact to='/profiles' activeClassName='active' ><i className='fa fa-user'></i> Profile</NavLink></li>
                            <li><NavLink exact to='/explore' activeClassName='active' ><i class="fas fa-user-friends"></i> People</NavLink></li>
                            <li><NavLink exact to='/posts' activeClassName='active' ><i class="fas fa-bookmark"></i> Bookmarks</NavLink></li>
                        </ul>
                        <span className='tweet-button' onClick={() => {openModalTwo()}}>Blab</span>
        </div>
        <div className='dashboard--navBar--greeting-box'>

        <div className='dashboard--navBar--greeting-box__image' onClick={openModal}>
                    <img src={user.avatar} />
                    <div className='dashboard--navBar--greeting-box__header'>
                        <span>{user.fullName}</span>
                        <span>@{user.handle}</span>
                    </div>
                    <i className='fas fa-angle-down'></i>
        </div>
        </div>
        </div>    
    </header>
    <Fragment>
        <Modal
            className='dashboard--navBar--modal'
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={bottomModal}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
                <div id='modal--container' className='dashboard--navBar--modal-inner'> 
                    <div className='modal--header'>
                        <div className='dashboard--navBar--greeting-box__image__inner'>
                        <img src={user.avatar} />
                            <div className='dashboard--navBar--greeting-box__header'>
                                <span>{user.fullName}</span>
                                <span>@{user.handle}</span>
                            </div>
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                    <div className='dashboard--modal--settings-container'>
                    <div className='modal--settings'>
                        <span >Delete your account</span>
                        {/* onClick={e => deleteAccount(user._id)} */}
                    </div>
                    <div className='modal--settings'>
                    <span onClick={logout}>Logout @{user.handle}</span>
                    </div>
                    </div>
                </div>
                <div></div>
        </Modal>
    </Fragment>
    </Fragment>
};
DashboardNavBar.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, { logout, deleteAccount })(DashboardNavBar);