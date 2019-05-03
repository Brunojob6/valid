import { all, call } from 'redux-saga/effects';
import student from './student';
import scan from './scan';
import storage from './storage';

export default function* IndexSaga() {
	yield all([
		call(student),
		call(scan),
		call(storage),
	]);
}
