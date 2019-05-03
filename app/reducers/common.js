import * as actions from '../actions';
import type { CommonState, CommonAction } from '../flow';

// @flow
const initialState = {
	loading: {
		status: false,
		message: '',
	},
};

export default (state: CommonState = initialState, action: CommonAction) => {
	switch (action.type) {
	case actions.LOADING:
		return {
			...state,
			loading: {
				status: !state.loading.status,
				message: action.message,
			},
		};
	case actions.LOADING_SCAN:
		return {
			...state,
			loading: {
				status: !state.loading.status,
				message: action.message,
			},
		};
	case actions.ERROR:
		return {
			...state,
			success: undefined,
			error: action.error,
		};
	case actions.SUCCESS:
		return {
			...state,
			error: undefined,
			success: action.message,
		};
	case actions.SET_SERIAL_NUMBER:
		return {
			...state,
			serialNumber: action.serialNumber,
		};
	case actions.CLEAR_ERROR:
		return {
			...state,
			error: undefined,
		};
	default:
		return state;
	}
};
