// @flow
import * as actions from './';
import type { CommonAction } from '../flow';


export const loading = (): CommonAction => ({
	type: actions.LOADING,
});

export const loadingScan = (): CommonAction => ({
	type: actions.LOADING_SCAN,
});

export const resetState = (): CommonAction => ({
	type: actions.RESET_COMMON_STATE,
});

export const setSerialNumber = (serialNumber: string): CommonAction => ({
	type: actions.SET_SERIAL_NUMBER,
	serialNumber,
});

export const getItem = (key: string): CommonAction => ({
	type: actions.GET_ITEM,
	key,
});

export const setItem = (key: string, value: string): CommonAction => ({
	type: actions.SET_ITEM,
	key,
	value,
});

export const getCfc = (key: string): CommonAction => ({
	type: actions.GET_CFC,
	key,
});

export const setCfc = (key: string, value: string): CommonAction => ({
	type: actions.SET_CFC,
	key,
	value,
});

export const removeItem = (key: string): CommonAction => ({
	type: actions.REMOVE_ITEM,
	key,
});

export const clearError = (): CommonAction => ({
	type: actions.CLEAR_ERROR,
});
