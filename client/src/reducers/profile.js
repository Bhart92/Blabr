import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	GET_PROFILES,
    ADD_FOLLOWER
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	followers: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
			};
			case ADD_FOLLOWER:
				return {
					...state,
					followers: payload
				};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false
			};
		default:
			return state;
	}
}