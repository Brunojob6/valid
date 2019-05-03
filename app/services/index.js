import * as ErrorService from './error';
import * as StudentService from './student';
import * as ScanService from './scan';
import * as StorageService from './storage';

//const URL = 'http://simuladorautosmartsim.com.br/webservice_1.5';
const URL = 'http://simuladorautosmartsim.com.br/homologacao/webservice_1.5';

const getHeaders = () => {
	const headers = {
		'Accept': 'application/json, */*',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	};
	return headers;
};

/* eslint guard-for-in: 0, no-restricted-syntax: 0 */
const ObjectToFormData = (values) => {
	const formData = new FormData();
	for (const item in values) {
		formData.append(item, values[item]);
	}

	return formData;
};

/* eslint no-prototype-builtins: 0 */
function handleJSONResponse(response) {
	return response.json()
		.then((json) => {
			if (response.ok) {
				if ((json.hasOwnProperty('status') && !json.status)
					|| (json.hasOwnProperty('cod') && !json.cod)) {
          			console.log(json);
					throw new ErrorService.ErrorApi(json.status || '', json.message || json.msg || '');
        		}
				return json;
			}
			throw new ErrorService.ErrorApi(json.status || '', json.message || '');
		});
}

const isNotJson = (value) => {
	try {
		return JSON.parse(value);
	} catch (e) {
		throw new Error('Value is not JSON');
	}
};

function handleTextResponse(response) {
	return response.text()
		.then((text) => {
			isNotJson(text);
			if (response.ok) {
				return text;
			}
			throw new Error(text);
		});
}

function dectectDriverServer(response) {
	if (response.url.indexOf('localhost') !== -1 && response.status === 404) {
		throw new Error('Servidor do leitor biométrico está desconectado, por favor renicie a aplicação ou entre contate com o suporte do sistema.');
	}
}

function handleResponse(response) {
	const contentType = response.headers.get('content-type');
	if (contentType !== null && contentType.includes('application/json')) {
		return handleJSONResponse(response);
	} else if (contentType !== null && contentType.includes('text/html')) {
		return handleTextResponse(response);
	}
	dectectDriverServer(response);
	// Other response types as necessary. I haven't found a need for them yet though.
	throw new Error(`Desculpe, tipo do conteúdo ${contentType} não é suportado. Contate o administrador do sistema.`);
}

export const request = (
	method,
	path,
	body = {},
	existUrl = false,
	formData = false,
) => {
	const attributes = {
		method,
	};
	if (!formData) {
		attributes.headers = getHeaders(formData);
	}
	if (Object.keys(body).length > 0) {
		attributes.body = formData ? ObjectToFormData(body) : body;
	}
	console.log(body);
	const realUrl = existUrl ? path : `${URL}${path}`;
	console.log("URL: "+realUrl);
	return fetch(realUrl, attributes)
		.then(handleResponse)
		.then(data => data)
		.catch((error) => {
			console.log("TesteErro"+error)
			console.log(error)
			if (realUrl.indexOf('localhost') !== -1
				&& error.message !== undefined
				&& error.message === 'Failed to fetch') {
				//throw new Error('Servidor do leitor biométrico está desconectado, por favor renicie a aplicação ou entre contate com o suporte do sistema.');
				//throw new Error('Por favor contatar o suporte do sistema.');
				throw new Error('Leitor Biometrico não responde, favor REINICIAR O VALIDA BIO !');
			}
			throw error;
		});
};

export {
	ErrorService,
	StudentService,
	ScanService,
	StorageService,
};
