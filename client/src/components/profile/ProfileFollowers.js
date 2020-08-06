import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const ProfileFollowers = ({ followerProfiles}) => {

    const [seeMore, setSeeMore] = useState(false);
    const [seeMoreText, setSeeMoreText] = useState('See All');


    const toggleSeeMore = () => {
       setSeeMore(!seeMore); 
       if(!seeMore){
        setSeeMoreText('See All')
       } else{
        setSeeMoreText('Hide')

       }
       console.log(seeMore)
    }

  return !followerProfiles ? (
    <Spinner />
  ) : (
    <div className='dashboard--profile--following--container'>

{!seeMore ? (

<Fragment>
{followerProfiles.slice(0,6).map(follower => {
        return <div  className='dashboard--profile--following--container-user' key={follower._id}>
            <img src={follower.avatar} />
        <p>{follower.firstName}</p>
    </div>
    })}
</Fragment>
) : (
<Fragment>
{followerProfiles.map(follower => {
        return <div  className='dashboard--profile--following--container-user' key={follower._id}>
            <img src={follower.avatar} />
        <p>{follower.firstName}</p>
    </div>
    })}
</Fragment>

)}

<span className='seeMore' onClick={() => toggleSeeMore()}>
        {!seeMore ? 'See All' : 'Hide'}
        </span>
</div>
  );
};

export default connect(
  null,
  {  }
)(ProfileFollowers);