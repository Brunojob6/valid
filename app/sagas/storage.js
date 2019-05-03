import { call, put, takeEvery } from 'redux-saga/effects';

import { StorageService, ErrorService } from '../services';
import * as actions from '../actions';

export function* get(obj) {
	try {
		yield put({ type: actions.LOADING });
		const value = yield call(StorageService.getItem, obj.key);
		yield put({ type: actions.SET_SERIAL_NUMBER, serialNumber: value || '' });
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error) });
	} finally {
		yield put({ type: actions.LOADING });
	}
}

export function* set(obj) {
	try {
		yield put({ type: actions.LOADING });
		yield call(StorageService.setItem, obj.key, obj.value);
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error) });
	} finally {
		yield put({ type: actions.LOADING });
	}
}


export function* remove(obj) {
	try {
		yield put({ type: actions.LOADING });
		yield call(StorageService.removeItem, obj.key);
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error) });
	} finally {
		yield put({ type: actions.LOADING });
	}
}


export default function* scan() {
	yield takeEvery(actions.SET_ITEM, set);
	yield takeEvery(actions.GET_ITEM, get);
	yield takeEvery(actions.REMOVE_ITEM, remove);
}
