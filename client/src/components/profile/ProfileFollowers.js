import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileFollowers = ({ profile: {profile, profiles}, followerProfiles}) => {

  const [seeMore, setSeeMore] = useState(false);
  const [seeMoreText, setSeeMoreText] = useState('See All');
  const toggleSeeMore = () => {
       setSeeMore(!seeMore); 
       if(!seeMore){
        setSeeMoreText('See All')
       } else{
        setSeeMoreText('Hide')
       }
  }

  return !followerProfiles ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='dashboard--profile-following'>
        {!seeMore ? (
          <Fragment>
            {followerProfiles && followerProfiles.length <= 0 && <p>There doesn't seem to be anything here</p>}
              {followerProfiles.slice(0,6).map(follower => {
                return <div className='dashboard--profile-following--user-container' key={follower._id}>
                  <img src={follower.avatar} />
                  <p>{follower.firstName} {follower.lastName}</p>
                </div>
              })}
          </Fragment>
          ) : (
          <Fragment>
            {followerProfiles.map(follower => {
              return <div  className='dashboard--profile-following--user-container' key={follower._id}>
                <img src={follower.avatar} />
                <p>{follower.firstName}</p>
              </div>
            })}
          </Fragment>
        )}
      </div>
      <Fragment>
            <span className='seeMore' onClick={() => toggleSeeMore()}>
          {followerProfiles.length <= 6 ? '' : <span>{!seeMore ? 'See All' : 'Hide'}
          </span>}
        </span>
      </Fragment>
    </Fragment>
  );
};
ProfileFollowers.propTypes = {
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
)(ProfileFollowers);