import {
    GET_NEWS, CLEAR_NEWS
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
        case CLEAR_NEWS:
            return {
                ...state,
                articles: []
            };
        default:
            return state;
    }
  };