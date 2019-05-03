import { request } from './';

const URL = 'http://localhost:8080/driver';

export const init = () =>
	request('GET', `${URL}/init`, {}, true);

export const finish = () =>
	request('GET', `${URL}/finish`, {}, true);

export const capture = () =>
	request('POST', `${URL}/capture`, {}, true);

