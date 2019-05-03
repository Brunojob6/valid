// @flow
import * as actions from './';
import type { BasicAction, StudentAction } from '../flow';

export const getAllClassWithStudent = (): BasicAction => ({
	type: actions.GET_ALL_CLASS_WITH_STUDENT,
});

export const sendFingers = (): BasicAction => ({
	type: actions.VALID_FINGERS,
});

export const getFingers = (sessionID: string, period: string | number): StudentAction => ({
	type: actions.GET_FINGERS,
	sessionID,
	period,
});

export const getValidarTicket = (sessionID: string, period: string | number): BasicAction => ({
	type: actions.VALIDATE_TICKET,
	sessionID,
	period,
});

export const postCancelClassStudent = (sessionID: string): BasicAction => ({
	type: actions.CANCEL_CLASS_STUDENT,
	sessionID,
});

export const lastLessonStudent = (sessionID: string): BasicAction => ({
	type: actions.LAST_LESSON_STUDENT,
	sessionID,
});


export const startLessonStudent = (sessionID: string): BasicAction => ({
	type: actions.START_LESSON_STUDENT,
	sessionID,
});
export const loadListClass = (): BasicAction => ({
	type: actions.GET_ALL_CLASS_WITH_STUDENT,
});
