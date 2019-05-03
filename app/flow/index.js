// @flow

export type BasicAction = {
	type: string;
	message?: string
};

export type CommonAction = {
	type: string;
	message?: string;
	serialNumber?: string
};

export type ScanAction = {
	type: string;
	key?: string;
	typePerson?: string
};

export type SessionPacketType = {
	idAgenda: string;
	dataAgendamento: string;
	horaInicioAula: string;
	agendaOffline: string;
	agendaStatus: string;
	nomeAluno: string;
	cpfAluno: string;
	nomeInstrutor: string;
	cpfInstrutor: string;
	nomeInterprete: string;
	cpfInterprete: string
};

export type FingerType = {
	chave: string;
	PosicaoDedo: string;
	check?: boolean
};

export type StudentAction = {
	type: string;
	sessionID?: string;
	period?: string | number;
	list?: Array<SessionPacketType>;
	candidato?: Array<FingerType>;
	interprete?: Array<FingerType>;
	instrutor?: Array<FingerType>;
	status?: string;
	statusCancel?: string;
	lesson?: string;
	lessonLast?: string;
	key?: string
};

export type Alert = {
	status?: string;
	message?: string
};

export type Loading = {
	status: boolean;
	message?: string
};

export type LoadingScan = {
	status: boolean;
	message?: string
};

export type CommonState = {
	loading: Loading
};

export type ErrorType = {
	status?: string;
	message?: string
};
export type SuccessType = {
	status?: string;
	message?: string
}

export type WarningType = {
	status?: string;
	message?: string
};
