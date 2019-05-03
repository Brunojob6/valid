import { request } from './';

// const param = (key, values) => (values[key] ? `${key}=${values[key]}&` : '');

export const getSessionPackets = serialNumber =>
	request('GET', `/detranrs/index.php?service=listarAgendamentos&codSimulador=${serialNumber}`, {});

export const getFingers = (sessionID, period) =>
	request('GET', `/valid/getFingers.php?SessionID=${sessionID}&Periodo=${period}`, {});

export const valid = (WSQ, chave, ultimaDigitalUtilizada ) =>
	request('POST', '/valid/valida.php', { WSQ, chave, ultimaDigitalUtilizada }, false, true);

export const getValidTicket = sessionID =>
	request('GET', `/detranrs/index.php?service=validarTicket&idagenda=${sessionID}`, {});

export const postCancelClass = sessionID =>
	request('GET', `/detranrs/index.php?service=cancelarAula&idagenda=${sessionID}`, {});

export const postStartLessonStudent = sessionID =>
	request('POST', `/detranrs/index.php?service=iniciarAula&idagenda=${sessionID}`, {});

export const postLastLessonStudent = sessionID =>
	request('POST', `/detranrs/index.php?service=concluirAula&idagenda=${sessionID}`, {});

