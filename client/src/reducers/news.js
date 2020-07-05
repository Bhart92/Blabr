import {
    GET_NEWS
} from '../actions/types';

const initialState = {
    articles: [],
    outlet: ''
  };

  export default function(state = initialState, action) {
    const { type, payload, outlet } = action;


    switch (type) {
        case GET_NEWS:
            return {
                ...state,
                outlet,
                articles: payload
            };
        default:
            return state;
    }
  };