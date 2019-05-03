import * as CommonAction from './common';
import * as StudentAction from './student';
import * as ScanAction from './scan';

// @flow

// COMMON
export const LOADING:string = 'LOADING';
export const LOADING_SCAN:string = 'LOADING_SCAN';
export const SUCCESS:string = 'SUCCESS';
export const ERROR:string = 'ERROR';
export const CLEAR_ERROR:string = 'CLEAR_ERROR';
export const RESET_COMMON_STATE:string = 'RESET_COMMON_STATE';
export const LOCATION_CHANGE:string = '@@router/LOCATION_CHANGE';
export const SET_SERIAL_NUMBER:string = 'SET_SERIAL_NUMBER';
export const GET_ITEM:string = 'GET_ITEM';
export const SET_ITEM:string = 'SET_ITEM';
export const GET_CFC:string = 'GET_CFC';
export const SET_CFC:string = 'SET_CFC';
export const REMOVE_ITEM:string = 'REMOVE_ITEM';

// STUDENT
export const GET_ALL_CLASS_WITH_STUDENT:string = 'GET_ALL_CLASS_WITH_STUDENT';
export const SET_ALL_CLASS_WITH_STUDENT:string = 'SET_ALL_CLASS_WITH_STUDENT';
export const SET_STATUS_VALIDATE_STUDENT:string = 'SET_STATUS_VALIDATE_STUDENT';
export const SET_STATUS_CLASS_CANCEL:string = 'SET_STATUS_CLASS_CANCEL';
export const GET_FINGERS:string = 'GET_FINGERS';
export const SET_FINGERS:string = 'SET_FINGERS';
export const VALIDATE_TICKET:string = 'VALIDATE_TICKET';
export const CANCEL_CLASS_STUDENT:string = 'CANCEL_CLASS_STUDENT';
export const LAST_LESSON_STUDENT:string = 'LAST_LESSON_STUDENT';
export const SET_START_LESSON_STUDENT:string = 'SET_START_LESSON_STUDENT';
export const SET_LAST_LESSON_STUDENT:string = 'SET_LAST_LESSON_STUDENT';
export const START_LESSON_STUDENT:string = 'START_LESSON_STUDENT';
export const VALID_FINGERS:string = 'VALID_FINGERS';
export const SET_SESSIONID:string = 'SET_SESSIONID';
export const FINGER_READ_SUCCESS_CANDIDATO:string = 'FINGER_READ_SUCCESS_CANDIDATO';
export const FINGER_READ_SUCCESS_INTERPRETE:string = 'FINGER_READ_SUCCESS_INTERPRETE';
export const FINGER_READ_SUCCESS_INSTRUTOR:string = 'FINGER_READ_SUCCESS_INSTRUTOR';

// SCAN
export const INIT_SCAN:string = 'INIT_SCAN';
export const CAPTURE_SCAN:string = 'CAPTURE_SCAN';
export const FINISH_SCAN:string = 'FINISH_SCAN';

export { CommonAction, StudentAction, ScanAction };
