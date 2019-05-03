export class ErrorApi extends Error {
	constructor(status, message) {
		super();
		this.status = status || 'Aviso';
		this.message = message;
	}
}
/* eslint no-plusplus: 0 */
const contains = (a, obj) => {
	let i = a.length;
	while (i--) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
};

const offline = 'Atualmente nosso serviço se encontra offline, por favor tente novamente daqui alguns minutos';
const admin = 'Ocorreu um erro, por favor entre em contato com administração do sistema';

/* eslint no-prototype-builtins: 0 */
export const treatError = (error, status) => {
	const msg = {
		status: 'Alerta',
	  };
	if (error instanceof ErrorApi) {
		if (error.status === 'INTERNAL_SERVER_ERROR') {
      		msg.message = admin;
		} else {
			msg.message = error.message;
		}
	} else if (status !== undefined && !status) {
		msg.message = 'Sem conexão com a internet';
	} else if (contains(['Failed to fetch', 'response is not defined', 'Network request failed'], error.message)) {
		msg.message = admin;
	} else if (error.message === 'Value is not JSON') {
		msg.message = offline;
	} else if (typeof error === "string"){
		msg.message = error;
	 } else {
		msg.message = error.message;
	 }
	return msg;
};
