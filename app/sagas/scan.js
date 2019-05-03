import { call, put, takeLatest, select } from 'redux-saga/effects';
import { ErrorService, ScanService, StudentService, StorageService } from '../services';
import * as actions from '../actions';

export function* init() {
	try {
		// yield put({ type: actions.LOADING });
		yield call(ScanService.init);
		yield put({ type: actions.SUCCESS });
	} catch (error) {
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error) });
	} 
	/*finally {
		//yield put({ type: actions.LOADING });
	}*/
}

export function* finish() {
	try {
		console.log("Função finish")
		yield put({ type: actions.LOADING });
		yield call(ScanService.finish);
		yield put({ type: actions.SUCCESS });
	} catch (error) {
		console.log(error);
		//yield put({ type: actions.ERROR, error: ErrorService.treatError(error) });
	} finally {
		yield put({ type: actions.LOADING });
	}
}

/* eslint no-param-reassign: 0 */
const checkFinger = (list, key, statusDigital) => {
	if(statusDigital){
		list.map( cand => {
			if (cand !== undefined) {
				cand.check = true;
				const index = list.indexOf(cand);
				list[index] = cand;
			}	
		});
	} else {
		const fingerSelected = list.filter(item => item.chave === key)[0];
		console.log(fingerSelected);
		if (fingerSelected !== undefined) {
			fingerSelected.check = true;
			const index = list.indexOf(fingerSelected);
			list[index] = fingerSelected;
		}
	}
	console.log(list);
	return list;
};

/* eslint no-param-reassign: 0 */
const checkErrorScan = (error, candError, key ) => {
	console.log("LOL" + error);
	error = error.toString();
	let errorScanMsg = "Error: Ocorreu um problema na captura. Por favor verifique se o leitor está corretamente conectado.";
	let existeError = error.indexOf(errorScanMsg) >= 0 ;	
	existeError === false ? checkFinger(candError, key, false) : "";
}

/* eslint no-param-reassign: 0 */
const sleep = (time) =>  {
	return new Promise((resolve) => setTimeout(resolve, time));
}

export function* capture(obj) {
	let candidatoError ;
	if (obj.typePerson === "student") {
		candidatoError = yield select(state => state.student.candidato);
	} else if(obj.typePerson == "interprete") {
		candidatoError = yield select(state => state.student.interprete);
	} else {
		candidatoError = yield select(state => state.student.instrutor);
	}
	console.log(candidatoError);
	try {
		//yield put({ type: actions.LOADING, message: 'Capturando dedo...' });
		const photo = yield call(ScanService.capture);
		localStorage.setItem("IMG_BASE64", JSON.stringify(photo.image[1]));
		yield put({ type: actions.LOADING_SCAN, message: photo.image[1]});
		yield sleep(2000).then(() => { });
		const key = parseInt(obj.key, 10);
		if (obj.typePerson === 'student') {
			let candidato = yield select(state => state.student.candidato);
			let ultDigital = candidato[candidato.length - 1];
			let numberDigital = ultDigital.chave !== obj.key ? 0 : 1;
			const response = yield call(StudentService.valid, photo.image[0], key, numberDigital);
			checkFinger(candidato, obj.key, response.cod);

			yield put({ type: actions.FINGER_READ_SUCCESS_CANDIDATO, candidato });
		} else if (obj.typePerson === 'interprete') {
			let interprete = yield select(state => state.student.interprete);
			let ultDigital = interprete[interprete.length - 1];
			let numberDigital = ultDigital.chave !== obj.key ? 0 : 1;
			const response = yield call(StudentService.valid, photo.image[0], key, numberDigital);
			checkFinger(interprete, obj.key, response.cod);
			yield put({ type: actions.FINGER_READ_SUCCESS_INTERPRETE, interprete });
		} else {
			let instrutor = yield select(state => state.student.instrutor);
			let ultDigital = instrutor[instrutor.length - 1];
			let numberDigital = ultDigital.chave !== obj.key ? 0 : 1;
			const response = yield call(StudentService.valid, photo.image[0], key, numberDigital);
			checkFinger(instrutor, obj.key, response.cod);
			//StartLesson
			let sessionID = yield call(StorageService.getItem, 'ID_SESSION');
			let typeCourse = yield call(StorageService.getItem, 'START_COURSE');
			if(typeCourse == '1') {
				const start = yield call(StudentService.postStartLessonStudent, sessionID);
				let t = JSON.parse(start);
				localStorage.setItem("LESSON_STATUS", JSON.stringify(t.status));
				if (!t.status){
					yield put({ type: actions.ERROR, error: ErrorService.treatError(t.message, navigator.onLine) });
				} else {
					yield put({ type: actions.FINGER_READ_SUCCESS_INSTRUTOR, instrutor });
				}
			} else {
				const final = yield call(StudentService.postLastLessonStudent, sessionID);
				let t = JSON.parse(final);
				localStorage.setItem("LESSON_STATUS", JSON.stringify(t.status));
				if (!t.status){
					yield put({ type: actions.ERROR, error: ErrorService.treatError(t.message, navigator.onLine) });
				} else {
					yield put({ type: actions.FINGER_READ_SUCCESS_INSTRUTOR, instrutor });
				}
			}
		}
	} catch (error) {
		yield put({ type: actions.LOADING });
		error.toString().indexOf('Error: Ocorreu um problema na captura.') == 0 ? '' : checkErrorScan(error, candidatoError, obj.key);
		yield put({ type: actions.ERROR, error: ErrorService.treatError(error) });
	} finally {
		yield put({ type: actions.LOADING });
	}
}


export default function* scan() {
	yield takeLatest(actions.INIT_SCAN, init);
	yield takeLatest(actions.FINISH_SCAN, finish);
	yield takeLatest(actions.CAPTURE_SCAN, capture);
}