import React from 'react';
import styled from 'styled-components';
import { push, goBack } from 'react-router-redux';
import { connect } from 'react-redux';

import { CommonAction, ScanAction } from '../../actions';
import type { Loading as LoadingType, FingerType } from '../../flow';
import { Head, Loading, Hand, Alert } from '../../components';

const Container = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	align-items: center;
	&:focus {
		outline-width: 0;
	}
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Main = Row.extend``;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px;
`;

const Content = styled.div`
	display: flex;
	height: 70vh;
	width: 75vw;
	align-items: center;
	justify-content: center;
`;

const Button = styled.button`
	height: 40px;
	width: 100px;
	border: none;
	border-radius: 3px;
	font-size: 20px;
	font-weight: 500;
	font-family: Catamaran;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	&:active {
		box-shadow: 0 0 0 rgba(0, 0, 0, 0.12), 0 0 0 rgba(0, 0, 0, 0.24);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
	&:focus {
		outline-width: 0;
	}
`;

const Default = Button.extend`
	background: #f8f9fa;
	color: #000;
	font-family: 'Roboto', sans-serif;
`;

const Actions = Row.extend`
	display: flex;
	width: 90%;
	aling-items: center;
	justify-content: center;
`;

const H3 = styled.h3`
	font-family: 'Roboto', sans-serif;
`;

const Step = styled.h4`
	font-family: 'Roboto', sans-serif;
	color: #e44f5e;
	font-weight: bold;
`;

const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-around;
	min-height: 40px;
	width: 300px;
	margin: 5px;
`;
const Group = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
`;

const NumberItem = styled.span`
	font-family: 'Open Sans', sans-serif;
	background-color: ${props => props.color};
	font-weight: bold;
	width: 23px;
	border-radius: 50%;
	align-text: center;
`;

const TextItem = styled.span`
	font-family: 'Roboto', sans-serif;
	font-weight: 400i;
	font-size: 15px;
	margin-top: 3px;
`;

const ContentCenter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const DivScan = styled.div`
	display: flex;
	align-items: left;
	margin-right: 5px;
`;
const H3Scan = styled.h3`
	font-family: 'Roboto', sans-serif;
	margin-left: 22px;
	margin-top: 12%;
`;

// @flow

type StudentProps = {
	fingers: Array<FingerType>,
	capture: Function,
	nextStep: Function,
	interprete: boolean
};

const FingersUtil = [
	'Polegar Direito',
	'Polegar Esquerdo',
	'Indicador Direito',
	'Indicador Esquerdo',
	'Médio Direito',
	'Médio Esquerdo',
	'Anular Direito',
	'Anular Esquerdo',
	'Mínimo Direito',
	'Mínimo Esquerdo'
];

const Student = ({ fingers, capture, nextStep, interprete }: StudentProps) => {
	// Alteração para captura varias dedos
	const fingerSelected = fingers.filter(item => item.check === undefined)[0];
	const fingersSelected = fingers.filter(item => item.check !== undefined);
	let lastFingerSelected, positionDedo;
	if (fingersSelected !== []) {
		lastFingerSelected = fingersSelected[fingersSelected.length - 1];
	}
	if (fingerSelected !== undefined) {
		positionDedo = fingerSelected.PosicaoDedo == '0' ? '10' : fingerSelected.PosicaoDedo;
		return (
			<Column>
				<Row>
					<Hand
						transform="scale(-1 1)"
						activeFinger={positionDedo}
						activeHand={positionDedo % 2 === 0}
						onClick={() => capture(fingerSelected.chave, 'student')}
					/>
					<Hand
						activeFinger={positionDedo}
						activeHand={positionDedo % 2 !== 0}
						onClick={() => capture(fingerSelected.chave, 'student')}
					/>
				</Row>
				<H3>Aluno</H3>
				<Step>
					Faça leitura do{' '}
					{FingersUtil[positionDedo - 1]}{', '}
					click na bolinha amarela
					{lastFingerSelected !== undefined &&
					lastFingerSelected.PosicaoDedo ===
						positionDedo
						? ' novamente'
						: ''}{' '}
				</Step>
			</Column>
		);
	}
	return (
		<Alert.Confirmation show>
			<H3>Agora precisamos fazer a leitura biometrica do {interprete === true ? 'intérpreter': 'instrutor'}</H3>
			<Actions>
				<Default onClick={() => nextStep()}>OK</Default>
			</Actions> 
		</Alert.Confirmation>
	);
};

type InterpreterProps = {
	fingers: Array<FingerType>,
	capture: Function,
	nextStep: Function
};

const Interpreter = ({ fingers, capture, nextStep }: InterpreterProps) => {
	const fingerSelected = fingers.filter(item => item.check === undefined)[0];
	const fingersSelected = fingers.filter(item => item.check !== undefined);
	let lastFingerSelected, positionDedo;
	if (fingersSelected !== []) {
		lastFingerSelected = fingersSelected[fingersSelected.length - 1];
	}
	if (fingerSelected !== undefined) {
		positionDedo = fingerSelected.PosicaoDedo == '0' ? '10' : fingerSelected.PosicaoDedo;
		return (
			<Column>
				<Row>
					<Hand
						transform="scale(-1 1)"
						activeFinger={positionDedo}
						activeHand={positionDedo % 2 === 0}
						onClick={() => capture(fingerSelected.chave, 'interprete')}
					/>
					<Hand
						activeFinger={positionDedo}
						activeHand={positionDedo % 2 !== 0}
						onClick={() => capture(fingerSelected.chave, 'interprete')}
					/>
				</Row>
				<H3>Intérprete</H3>
				<Step>
					Faça leitura do{' '}
					{FingersUtil[positionDedo - 1]}{', '}
					click na bolinha amarela
					{lastFingerSelected !== undefined &&
					lastFingerSelected.PosicaoDedo ===
						positionDedo
						? ' novamente'
						: ''}{' '}
				</Step>
			</Column>
		);
	}

	return (
		<Alert.Confirmation show>
			<H3>Agora precisamos fazer a leitura biometrica do instrutor</H3>
			<Actions>
				<Default onClick={() => nextStep()}>OK</Default>
			</Actions>
		</Alert.Confirmation>
	);
};

type TeacherProps = {
	fingers: Array<FingerType>,
	capture: Function,
	onClickBack: Function
};

const Teacher = ({ fingers, capture, onClickBack }: TeacherProps) => {
	const fingerSelected = fingers.filter(item => item.check === undefined)[0];
	const fingersSelected = fingers.filter(item => item.check !== undefined);
	let lastFingerSelected, positionDedo, lessonStatus;
	if (fingersSelected !== []) {
		lastFingerSelected = fingersSelected[fingersSelected.length - 1];
	}
	if (fingerSelected !== undefined) {
		positionDedo = fingerSelected.PosicaoDedo == '0' ? '10' : fingerSelected.PosicaoDedo;
		return (
			<Column>
				<Row>
					<Hand
						transform="scale(-1 1)"
						activeFinger={positionDedo}
						activeHand={positionDedo % 2 === 0}
						onClick={() => capture(fingerSelected.chave, 'teacher')}
					/>
					<Hand
						activeFinger={positionDedo}
						activeHand={positionDedo % 2 !== 0}
						onClick={() => capture(fingerSelected.chave, 'teacher')}
					/>
				</Row>
				<H3>Instrutor</H3>
				<Step>
					Faça leitura do{' '}
					{FingersUtil[positionDedo - 1]}{', '}
					click na bolinha amarela 
					{lastFingerSelected !== undefined &&
					lastFingerSelected.PosicaoDedo ===
						positionDedo
						? ' novamente'
						: ''}{' '}
				</Step>
			</Column>
		);
	}
	return (
		<Alert.Confirmation show>
			<ContentCenter>
				{lessonStatus = JSON.parse(localStorage.getItem("LESSON_STATUS"))}
				{/* 'Ocorreu um erro no sistema do detran, tente novamente' */}
				<H3>{lessonStatus == true ? 'Leitura Biometria feita com sucesso': 'Leitura Biometria feita com sucesso'}</H3>
				<Actions>
					<Default onClick={() => onClickBack()}>OK</Default>
				</Actions>
			</ContentCenter>
		</Alert.Confirmation>
	);
};

type Props = {
	serialNumber?: string,
	onLoadSerialNumber: Function,
	onClickGoBackHome: Function,
	onClickGoBackList: Function,
	loading: LoadingType,
	//loadingScan: LoadingTypeScan,
	candidato?: Array<FingerType>,
	interprete?: Array<FingerType>,
	instrutor?: Array<FingerType>,
	error?: ErrorType,
	onClickClearError: Function,
	onClickCapture: Function,
	onLoadInitScan: Function,
	onLoadFinishScan: Function
};

class Scan extends React.Component<Props> {
	state = {
		step: 0,
	};

	componentWillMount() {
		if (this.props.serialNumber === undefined) {
			this.props.onLoadSerialNumber();
		}
		this.props.onLoadInitScan();
	}

	componentWillUnmount() {
		this.props.onLoadFinishScan();
	}

	getClassToStep(step) {
		if (this.state.step === step) {
			return '#96c03d';
		}
		return '#FFF';
	}

	getContent() {
		{console.log(this.props)}
		if (
			this.props.candidato !== undefined ||
			this.props.interprete !== undefined ||
			this.props.instrutor !== undefined
		) {
			return (
				<Content>
					{this.state.step === 0 && (
						<Student
							fingers={this.props.candidato || []}
							capture={this.props.onClickCapture}
							nextStep={() => this.setState({ step: this.props.interprete !== undefined ? 1 : 2 })}
							interprete={this.props.interprete === undefined ? false:true}
						/>
					)}
					{/*  */ }
					{this.state.step === 1 && (
						<Interpreter
							fingers={this.props.interprete || []}
							capture={this.props.onClickCapture}
							nextStep={() => this.setState({ step: 2 })}
						/>
					)}
					{this.state.step === 2 && (
						<Teacher
							fingers={this.props.instrutor || []}
							capture={this.props.onClickCapture}
							onClickBack={this.props.onClickGoBackList}
						/>
					)}
				</Content>
			);
		}

		return null;
	}

	onKeyPressed = e => {
		if (e.key === 'F5') {
			this.props.onLoadInitScan();
		}
	};

	render() {
		return (
			<Container onKeyDown={e => this.onKeyPressed(e)} tabIndex="0">
				<Loading loading={this.props.loading} />
				<Head display={'none'}
					serialNumber={this.props.serialNumber}
					goHome={this.props.onClickGoBackHome}
					goList={this.props.onClickGoBackList}
					clickUpdate={this.props.onLoadInitScan}
				/>
				<Alert.ErrorA
					error={this.props.error}
					onClose={() => this.props.onClickClearError()}
				/>
				<Nav>
					<Group>
						<NumberItem color={this.getClassToStep(0)}>
							1
						</NumberItem>
						<TextItem>Aluno</TextItem>
					</Group>
					{this.props.interprete !== undefined && (
						<Group>
							<NumberItem color={this.getClassToStep(1)}>
								2
							</NumberItem>
							<TextItem>Intérprete</TextItem>
						</Group>
					)}
					<Group>
						<NumberItem color={this.getClassToStep(2)}>
							{this.props.interprete !== undefined ? 3 : 2 }
						</NumberItem>
						<TextItem>Instrutor</TextItem>
					</Group>
				</Nav>
				<Main>{this.getContent()}</Main>
			</Container>
		);
	}
}
const mapStateToProps = state => ({
	loading: state.common.loading,
	serialNumber: state.common.serialNumber,
	candidato: state.student.candidato,
	instrutor: state.student.instrutor,
	interprete: state.student.interprete,
	error: state.common.error
});

const mapDispatchToProps = dispatch => ({
	onClickGoBackHome() {
		dispatch(push('/'));
	},
	onClickGoBackList() {
		dispatch(goBack());
	},
	onLoadSerialNumber() {
		dispatch(CommonAction.getItem('serialNumber'));
	},
	onClickCapture(chave, typePerson) {
		dispatch(CommonAction.clearError());
		dispatch(ScanAction.capture(chave, typePerson));
	},
	onLoadInitScan() {
		dispatch(ScanAction.init());
	},
	onLoadFinishScan() {
		console.log("Inicio Finish")
		dispatch(ScanAction.finish());
	},
	onClickClearError() {
		dispatch(CommonAction.clearError());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Scan);
