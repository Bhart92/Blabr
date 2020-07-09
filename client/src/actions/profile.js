import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    SET_ALERT,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    ADD_FOLLOWER,
    REMOVE_FOLLOWER
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    const { profile, followerProfiles } = res.data;

    dispatch({
      type: GET_PROFILE,
      payload: profile,
      payloadTwo: followerProfiles
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    const { profiles, followerProfiles } = res.data;
    dispatch({
      type: GET_PROFILES,
      payload: profiles,
      payloadTwo: followerProfiles
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get all profile By Id
export const getProfileById = userId => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    const { profile, followerProfiles, posts } = res.data;
    // console.log(followerProfiles)
    dispatch({
      type: GET_PROFILE,
      payload: profile,
      payloadTwo: followerProfiles,
      postPayload: posts
    });
    // console.log(profile, followerProfiles)
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const filterByValue = (array, string) => {
  return array.filter(o =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}





















// Follow a user
export const follow = (userId) => async dispatch => {
  try {
      const res = await axios.post(`/api/profile/user/${userId}/follow-user`);
      dispatch({
        type: ADD_FOLLOWER,
        payload: res.data
      });
      dispatch(setAlert('User followed!'));

      console.log(res);
  } catch (err) {
    const {msg} = err.response.data;
    dispatch({
      type: SET_ALERT,
      payload: {msg: msg, status: err.response.status}
    })
    
  }
}


// Unfollow a user
export const unfollow = (userId) => async dispatch => {
  try {
      const res = await axios.post(`/api/profile/user/${userId}/unfollow-user`);
      dispatch({
        type: REMOVE_FOLLOWER,
        payload: res.data.followers
      });
      dispatch(setAlert('User unfollowed!'));
  } catch (err) {
    const {msg} = err.response.data;
    dispatch({
      type: SET_ALERT,
      payload: {msg: msg, status: err.response.status}
    })
    
  }
}





















// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    // if (!edit) {
    //   history.push('/dashboard');
    // }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};