import * as actions from '../actions';
import { CommonState, StudentAction } from '../flow';

// @flow
const initialState = {
  loading: {
    status: false,
    message: "",
  }
};

export default (state: CommonState = initialState, action: StudentAction) => {
	switch (action.type) {
	case actions.SET_ALL_CLASS_WITH_STUDENT:
		return {
			...state,
			list: action.list,
		};
	case actions.SET_STATUS_VALIDATE_STUDENT:
		return {
			...state,
			status: action.status,
		};	
	case actions.SET_START_LESSON_STUDENT:
		return {
			...state,
			lesson: action.lesson,
		};
	case actions.SET_START_LESSON_STUDENT:
		return {
			...state,
			lessonLast: action.lessonLast,
		};	
	case actions.SET_STATUS_CLASS_CANCEL:
		return {
			...state,
			statusCancel: action.statusCancel,
		};	
	case actions.SET_FINGERS:
		return {
			...state,
			candidato: action.candidato,
			interprete: action.interprete,
			instrutor: action.instrutor,
		};
	case action.FINGER_READ_SUCCESS_CANDIDATO:
		return {
			...state,
			candidato: action.candidato,
		};
	case action.FINGER_READ_SUCCESS_INTERPRETE:
		return {
			...state,
			candidato: action.interprete,
		};		
	case action.FINGER_READ_SUCCESS_INSTRUTOR:
		return {
			...state,
			candidato: action.instrutor,
		};
	default:
		return state;
	}
};
