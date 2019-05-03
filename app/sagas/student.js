import { call, put, takeLatest } from 'redux-saga/effects';
import { StudentAction } from '../../app/actions';
import { push } from 'react-router-redux';
import {
	ErrorService,
	StudentService,
	StorageService,
} from '../services';

import * as actions from '../actions';

export function* getAllClass() {
	try {
		yield put({ type: actions.LOADING, message: 'Buscando Aulas...' });
		const serialNumber = yield call(StorageService.getItem, 'serialNumber');
		const response = yield call(StudentService.getSessionPackets, serialNumber);
		console.log(response);
		yield put({ type: actions.SET_ALL_CLASS_WITH_STUDENT, list: response});
	} catch (error) {
		yield put({ type: actions.SET_ALL_CLASS_WITH_STUDENT, list: undefined });
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error, navigator.onLine) });
	} finally {
		yield put({ type: actions.LOADING });
	}
}

export function* getFingers(obj) {
	try {
		const message = obj.period === '1' ? 'Iniciando aula...' : 'Finalizando aula';
		// yield put({ type: actions.LOADING, message });
		console.log("----------GetFINGERS");
		console.log(obj)
		console.log(new Date());
		const response = yield call(StudentService.getFingers, obj.sessionID, obj.period);
		console.log(new Date());
		console.log("----------D_GetFINGERS");
		//const { candidato, interprete, instrutor } = response.result;
		console.log(response);
		let { candidato, interprete, instrutor } = response.result;
		yield put({
			type: actions.SET_FINGERS,
			candidato,
			interprete,
			instrutor,
		});
		//Pode ser inicializado aqui o Driver
		yield put(push('/scan'));
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error, navigator.onLine) });
	} finally {
		//yield put({ type: actions.LOADING });
	}
}

export function* getValidateTicket(obj) {
	try {
		console.log(obj)
		yield put({ type: actions.LOADING, message: 'Validando Aula' });
		console.log("----------Validanção");
		console.log(new Date());
		const response = yield call(StudentService.getValidTicket, obj.sessionID);
		console.log(new Date());
		console.log("----------D_Validanção");
		let t = JSON.parse(response);
		// yield call(StorageService.setItem, 'VALID_TIKET', t);
		localStorage.setItem("V_TIKET", t.status ? true : false);
		yield put({ type: actions.SET_STATUS_VALIDATE_STUDENT, status: response});
		if (!t.status){
			yield put({ type: actions.ERROR, error: ErrorService.treatError(t.message, navigator.onLine) });
		} else {
			yield put(StudentAction.getFingers(obj.sessionID, obj.period));
		}
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error, navigator.onLine) });
	} finally {
		yield put({ type: actions.LOADING });
	}
}

export function* postCancelClassStudent(obj) {
	try {
		yield put({ type: actions.LOADING, message: 'Cancelando a Aula' });
		const response = yield call(StudentService.postCancelClass, obj.sessionID);
		console.log("Cancelando a Aula");
		let t = JSON.parse(response);
		yield put({ type: actions.SET_STATUS_CLASS_CANCEL, statusCancel: response});
		if (!t.status){
			yield put({ type: actions.ERROR, error: ErrorService.treatError(t.message, navigator.onLine) });
		}
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error, navigator.onLine) });
	} finally {
		yield put(StudentAction.loadListClass());
		yield put({ type: actions.LOADING });
	}
}

export function* startLessonStudent(obj) {
	try {
		yield put({ type: actions.LOADING, message: 'Iniciando a Aula' });
		const response = yield call(StudentService.postStartLessonStudent, obj.sessionID);
		console.log("Iniciando a Aula");
		console.log(response);
		let t = JSON.parse(response);
		yield put({ type: actions.SET_START_LESSON_STUDENT, lesson: response});
		if (!t.status){
			yield put({ type: actions.ERROR, error: ErrorService.treatError(t.message, navigator.onLine) });
		}
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error, navigator.onLine) });
	} finally {
		yield put({ type: actions.LOADING });
	}
}

export function* lastLessonStudent(obj) {
	try {
		yield put({ type: actions.LOADING, message: 'Finalizar a Aula' });
		const response = yield call(StudentService.postLastLessonStudent, obj.sessionID);
		console.log("Finalizar a Aula");
		console.log(response);
		let t = JSON.parse(response);
		yield put({ type: actions.SET_LAST_LESSON_STUDENT, lessonLast: response});
		if (!t.status){
			yield put({ type: actions.ERROR, error: ErrorService.treatError(t.message, navigator.onLine) });
		}
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error, navigator.onLine) });
	} finally {
		yield put(StudentAction.loadListClass());
		yield put({ type: actions.LOADING });
	}
}
export default function* student() {
	yield takeLatest(actions.GET_ALL_CLASS_WITH_STUDENT, getAllClass);
	yield takeLatest(actions.VALIDATE_TICKET, getValidateTicket);
	yield takeLatest(actions.GET_FINGERS, getFingers);
	yield takeLatest(actions.START_LESSON_STUDENT, startLessonStudent);
	yield takeLatest(actions.CANCEL_CLASS_STUDENT, postCancelClassStudent);
	yield takeLatest(actions.LAST_LESSON_STUDENT, lastLessonStudent);
	
}
