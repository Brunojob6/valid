import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { CommonAction, StudentAction, ScanAction } from '../../actions';
import { Head, Loading, Alert } from '../../components';
import type { Loading as LoadingType, ErrorType } from '../../flow';
import Question from './Question';
import QuestionCancel from './QuestionCancel';
import QuestionFinaly from './QuestionFinaly';
import Warning from './Warning';
import ProibLesson from './ProibLesson';

const Container = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	align-items: center;
	z-index: 2;
	&:focus {
		outline-width: 0;
	}
`;

const InputSearch = styled.div`
	width: 90vw;
	vertical-align: middle;
	white-space: nowrap;
	position: relative;
`;

const Input = styled.input`
	width: 90vw;
	height: 50px;
	background: #eeeeee;
	border: none;
	font-size: 15pt;
	font-weight: 600;
	float: left;
	color: #dddddd;
	padding-left: 45px;
	border-radius: 5px;
	font-family: 'Open Sans', sans-serif;
	&::-webkit-input-placeholder {
		color: #6d6d6d;
	}
	&:hover {
		outline: none;
		background: #ffffff;
		color: #000;
		border: 0.5px solid #6d6d6d;
	}
	&:focus {
		outline: none;
		background: #ffffff;
		color: #000;
		border: 0.5px solid #6d6d6d;
	}
	&:active {
		outline: none;
		background: #ffffff;
		border: 0.5px solid #6d6d6d;
	}
	transition: background 0.55s ease;
`;

const Icon = styled.span`
	position: absolute;
	left: 10px;
	bottom: 10px;
	color: #4f5b66;
`;

const SearchIcon = () => (
	<svg
		fill="#6d6d6d"
		width="20"
		height="20"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
	</svg>
);

const Students = styled.div`
	width: 90vw;
	height: 75vh;
	margin-top: 10px;
	overflow-y: ${props => (props.size > 3 ? 'scroll' : 'none')};
	#overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;
	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #f5f5f5;
	}
	&::-webkit-scrollbar {
		width: 6px;
		background-color: #f5f5f5;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #a0a0a0;
	}
`;

const Name = styled.span`
	font-family: 'Roboto', sans-serif;
	font-size: 18px;
	font-weight: 200;
`;

const CPF = styled.span`
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	font-weight: 400;
	font-style: italic;
`;

const Class = styled.div`
	flex-direction: row;
	font-family: 'Open Sans', sans-serif;
	font-weight: 800i;
	font-size: 14px;
	margin-left: 5px;
	font-style: italic;
`;

const ClassScholl = styled.div`
	display: flex;
	flex-direction: column;
	font-family: 'Open Sans', sans-serif;
	font-weight: 800i;
	font-size: 14px;
	margin-left: 5px;
	font-style: italic;
`;

const Description = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;
	width: 99%;
`;

const HR = styled.div`
    display: block;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
	overflow: hidden;
	margin-bottom:2px;
    border-style: inset;
    border-width: 1px;
`;

const Avatar = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 35px;
	background: #e3e3e3 url('file:///C:/Users/SMARTSIM/AppData/Local/Programs/valida-auto-sim/user.png') no-repeat top center;
	width: 70px;
	height: 70px;
	#background: #e3e3e3;
	font-size: 30px;
	margin-left: 7px;
	z-index: 2;
	font-family: 'Open Sans', sans-serif;
`;

const Item = styled.div`
	display: flex;
	flex-direction: row;
	background: #fff;
	align-items: center;
	min-height: 160px;
	width: 100%;
	margin: 5px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	&:hover {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	}
	&:active {
		box-shadow: 0 0 0 rgba(0, 0, 0, 0.12), 0 0 0 rgba(0, 0, 0, 0.24);
	}
`;

const Group = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 5px;
`;
const GroupStart = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin: 5px;
`;

const IconStatus = styled.span`
	display: flex;
	#flex-direction: row;
	#border: 1px solid red;
	margin-left: 0px;
	#height: 20px;
	cursor: default;
	height: auto;	
`;

const HoraInicioAula = styled.div`
	float: right;
`;

const OnOf = styled.span`
	background: ${props => props.on ? '#5cb85c' : '#ff2e4d'};
	color: #fff;
	font-family: 'Glyphicons Halflings';
    
	width: 200px;
	border: none;
	border-radius: 100px;
	font-weight: 700;
	font-size: 10px;
	margin-left: 5px;
	
	font-style: italic;
	text-align: center;
	padding: .1em 0.7em .1em 0.5em;
	cursor: default;
`;

const InfoStatus = styled.span`
	#background: #d9534f;
	#background: #d43f3a;
	background: #337ab7;
	color: #fff;
	width: 200px;
	border: none;
	border-radius: 3px;
	font-weight: 700;
	font-family: Arial;
	text-align: center;
	padding: .1em 0.7em .1em 0.5em;
	cursor: default;
`;

const ButtonCancel = styled.button`
	#background: #d43f3a;
	background: #ff2e4d;
	color: #fff;
	width: 130px;
	font-weight: 700;
	border-radius: .4em;
	font-family: Arial;
	text-align: center;
    border: 1px solid transparent;
	padding: 5px 10px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	&:hover {
		outline: none;
		background: #ffffff;
		color: #fff;
		background-color: #c9302c;
		border-color: #ac2925;
		cursor: pointer;
	}
`;

const ButtonFinaly = styled.button`
	background: #4caf50;
	color: #fff;
	width: 130px;
	font-weight: 700;
	border-radius: .4em;
	font-family: Arial;
	text-align: center;
    border: 1px solid transparent;
	padding: 5px 10px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	&:hover {
		outline: none;
		background: #ffffff;
		color: #fff;
		background-color: #2e7b32;
		border-color: #2e7b32;
		cursor: pointer;
	}
`;

const ButtonStart = styled.button`
	background: #00c0ef;
	color: #fff;
	width: 130px;
	font-weight: 700;
	border-radius: .4em;
	font-family: Arial;
	text-align: center;
    border: 1px solid transparent;
	padding: 5px 10px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	&:hover {
		outline: none;
		background: #ffffff;
		color: #fff;
		background-color: #04abd4;
		border-color: #04abd4;
		cursor: pointer;
	}
`;

const ButtonStartBlock = styled.button`
	display: block;
	background: #00c0ef;
	color: #fff;
	width: 35%;
	font-weight: 700;
	border-radius: .4em;
	font-family: Arial;
	text-align: center;
    border: 1px solid transparent;
	padding: 5px 10px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	&:hover {
		outline: none;
		background: #ffffff;
		color: #fff;
		background-color: #04abd4;
		border-color: #04abd4;
		cursor: pointer;
	}
`;


// @flow

type Props = {
	serialNumber?: string,
	onLoadSerialNumber: Function,
	onClickGoBackHome: Function,
	onClickSetStudentAndGoScan: Function,
	loading?: LoadingType,
	onLoadListClass: Function,
	onValidateTicketStudent: Function,
	onCancelClassStudent: Function,
	onLastLessonStudent: Function,
	onStartLessonStudent: Function,
	list?: Array<SessionPacketType>,
	status?: string,
	lessonLast?: string,
	lesson?: string,
	statusCancel?: string,
	error?: ErrorType,
	success?: SuccessType,
	onClickClearError: Function
};

type State = {
	show: boolean,
	sessionID: string,
	search: string
};

class List extends React.Component<Props, State> {
	state = {
		show: false,
		showStartClass: false,
		showCancel: false,
		showFinaly:false,
		showLesson:false,
		sessionID: '',
		statusSession: '',
		search: '',
	};
	componentDidMount(){
		console.log("DID_MOUNT_LIST");
		this.removeLessonCacheHomeList();
	}
	componentWillMount() {
		if (this.props.serialNumber === undefined) {
			this.props.onLoadSerialNumber();
		}
		this.props.onLoadListClass();
		// setInterval(() => this.removeLessonCacheHomeList(), 35000);
	}
	
	removeLessonCacheHomeList() {
		console.log('Remove ......... Home');
		let learned = JSON.parse(localStorage.getItem("AULAS_CAPTURADAS"));
		console.log(learned);
		learned = learned === null ? [] : learned;
		let data_new = new Date();
		if(learned.length > 0 ) {
			learned = learned.filter( lesson => new Date(lesson.endClass) > data_new);
			localStorage.setItem("AULAS_CAPTURADAS", JSON.stringify(learned));
		}
	}
	
	getFirstLetterTheName(name) {
		return name.charAt(0);
	}

	getFommatterDate(dateUS) {
		let data = dateUS.split("-");
		dateUS = data[2]+"/"+data[1]+"/"+data[0];
		return dateUS;
	}

	getFommatterTime(time) {
		let h = time.split(":");
		time = h[0]+":"+h[1]
		return time;
	}

	getConvetData(data) {
		let str = data.split('');
		const aux = str[1];
		str[1] = str[4];
		str[4] = aux;
		const aux_2 = str[0];
		str[0] = str[3];
		str[3] = aux_2;

		str = str.join('');
		
		return str;
	}

	getListModification() {
		let l = new Array();
	}

	getCompare(a, b) {
		return a.newData > b.newData;
	}

	getAddCache(arList) {
		let learned = JSON.parse(localStorage.getItem("AULAS_CAPTURADAS"));
		if(learned){
			learned.map(lesson => {
				arList.push(lesson);
			});
		}
		localStorage.setItem("STUDENTS", JSON.stringify(arList));
	}

	getCacheList() {
		let arList = JSON.parse(localStorage.getItem("STUDENTS"));
		return arList;
	}

	getOrderDate(list) {
		//list = list.filter(person => person.statusSession == 4 );
		/*
		let arList = new Array();
		list.map( a => {
			let hrs_a = a.dataAgendamento.split("-");
			let resultData = new Date(a.dataAgendamento + ' ' + a.horaInicioAula);
			a.newData = resultData;
			a.dataConvert = resultData.toString();
			arList.push(a);
			
			return arList;
		});
		// Adicionando no localStorange
		this.getAddCache(arList);

		// Get list Cache
		arList = this.getCacheList();
		arList.sort(this.getCompare);
		// console.log(arList);
		 */
		return list;
	}

	setObjSession(props) {
		let listArray = new Array();
		let classrooms = JSON.parse(localStorage.getItem("AULAS_CAPTURADAS"));
		classrooms = classrooms == null ? [] : classrooms;
		if(classrooms.length == 0) {
			listArray.push(props);
			localStorage.setItem("AULAS_CAPTURADAS", JSON.stringify(listArray));
		}else {
			classrooms.push(props);
			localStorage.setItem("AULAS_CAPTURADAS", JSON.stringify(classrooms));
		}
	}

	getListOfStudents() {
		if (this.state.search !== '' && this.props.list !== undefined) {
			return this.props.list.filter(
				item =>
					item.nomeAluno.toUpperCase().indexOf(
						this.state.search.toUpperCase()
					) !== -1
			);
		}
		return this.props.list;
	}

	onKeyPressed = e => {
		if (e.key === 'F5') {
			this.props.onLoadListClass();
		}
	};

	verifyStartLesson (agendaStatus, valid) {
		console.log("VERIFYLESSON");
		let list = this.getListOfStudents();
		list = list.filter(person => person.agendaStatus == "I" );
		console.log(list.length);
		if(valid) {
			if(list.length > 0){
				return true
			}
		} else {
			if(list.length == 0 && agendaStatus == 'S' || list.length == 0 && agendaStatus == "A") {
				return true;	
			}
		}
		return false;
	}

	render() {
		let list = this.getListOfStudents();
		console.log("LISTA");
		console.log(list);
		const listOfStudents = list !== undefined  ? this.getOrderDate(list) : list;
		return (
			<Container onKeyDown={e => this.onKeyPressed(e)} tabIndex="0">
				<Loading loading={this.props.loading} />
				<Head
					serialNumber={this.props.serialNumber}
					goHome={this.props.onClickGoBackHome}
					clickUpdate={this.props.onLoadListClass}
				/>
				<Alert.Confirmation show={this.state.show}>
					<Question
						key={this.state.sessionID}
						onClick={values => {
							this.state.statusSession == "A" ? this.props.onValidateTicketStudent(values) : this.props.onClickSetStudentAndGoScan(values);
							this.setState({ show: false });
						}}
						sessionID={this.state.sessionID}
						onCancel={() => this.setState({ show: false })}
						statusSession={this.state.statusSession}
					/>
				</Alert.Confirmation>
				<Alert.Confirmation show={this.state.showCancel}>
					<QuestionCancel
						key={this.state.sessionID}
						onClick={values => {
							console.log("Props.Status: "+ values.sessionID);
							this.props.onCancelClassStudent(values.sessionID);
							this.setState({ showCancel: false });
						}}
						sessionID={this.state.sessionID}
						onCancel={() => this.setState({ showCancel: false })}
						statusSession={this.state.statusSession}
					/>
				</Alert.Confirmation>
				<Alert.Confirmation show={this.state.showFinaly}>
					<QuestionFinaly
						key={this.state.sessionID}
						onClick={values => {
							this.props.onLastLessonStudent(values.sessionID);
							this.setState({ showFinaly: false });
						}}
						sessionID={this.state.sessionID}
						onCancel={() => this.setState({ showFinaly: false })}
						statusSession={this.state.statusSession}
					/>
				</Alert.Confirmation>
				<Alert.Confirmation show={this.state.showStartClass}>
					<Warning 
						sessionID={this.state.sessionID}
						onCancel={() => this.setState({ showStartClass: false })}
						/>
				</Alert.Confirmation>
				<Alert.Confirmation show={this.state.showLesson}>
					<ProibLesson 
						sessionID={this.state.sessionID}
						onCancel={() => this.setState({ showLesson: false })}
						/>
				</Alert.Confirmation>
				<Alert.ErrorA
					error={this.props.error}
					onClose={() => this.props.onClickClearError()}
				/>
				<Alert.SuccessA
					error={this.props.success}
					onClose={() => this.props.onClickClearError()}
				/>
				{listOfStudents !== undefined && (
					<InputSearch>
						<Icon>
							<SearchIcon />
						</Icon>
						<Input
							value={this.state.search}
							onChange={event =>
								this.setState({ search: event.target.value })
							}
							type="search"
							placeholder="Digite o nome do aluno"
						/>
					</InputSearch>
				)}
				<Students
					size={
						listOfStudents !== undefined ? listOfStudents.length : 0
					}

				>
					{listOfStudents &&
						listOfStudents.map(item => (
							<Item
								key={item.idAgenda}
							>	
								<Avatar>
								{/*
									
									{this.getFirstLetterTheName(
										item.nomeAluno
									)}
									<i title="Foto Aluno" className="fa fa-user-circle-o" aria-hidden="true">
									</i>
								*/}
									
								</Avatar>
								<Description>
									<Group>
										<Name>{item.nomeAluno}</Name>
										<Class>
											{this.getFommatterDate(
												item.dataAgendamento
											)}
										</Class>
									</Group>
									<Group>
										<Class>
										<CPF>{item.cpfAluno}</CPF>
										</Class>
										
										<Class>
											<IconStatus>
												<i title="Instrutor" className="fa fa-graduation-cap" aria-hidden="true">{" "+item.nomeInstrutor}</i>
											</IconStatus>
											{item.cpfInstrutor}
										</Class>
										{item.nomeInterprete == null && (
											<Class>
												<IconStatus>
													<i title="Interprete" className="fa fa-sign-language fa-6"> {" "+item.nomeInterprete}</i>
												</IconStatus>
												{item.cpfInterprete}
											</Class>	
										)}
										<Class>
											<IconStatus>
												{<InfoStatus title="Situação da Aula">{item.agendaStatusTitulo}</InfoStatus>}
											</IconStatus>
											<HoraInicioAula>
												{"Número da Agenda: "}
												{item.idAgenda}
												{" "}
												<i title="Hora da Aula" className="fa fa-clock-o" aria-hidden="true">
												{"  "+this.getFommatterTime(
													item.horaInicioAula
												)}
												</i>
												{item.agendaOffline == 0 ? (
													<OnOf on>
														ONLINE
													</OnOf>
												): 
												(
													<OnOf>
														OFFLINE
													</OnOf>
												)}
											</HoraInicioAula>
										</Class>
									</Group>
									{item.agendaStatus == "S" || item.agendaStatus == "A" || item.agendaStatus == "I" ? <HR/> : '' }
									{item.agendaStatus == "I" && (
										<Group>
											<Class>
											{item.agendaStatus == "I" && (
												<IconStatus>
													<ButtonCancel
														onClick={() =>
															this.setState({
																show: false,
																showStartClass: false,
																showCancel: true,
																sessionID: item.idAgenda,
																statusSession: item.nomeAluno,
															})
														}
														>Cancelar aula</ButtonCancel>
												</IconStatus>
											)}
											</Class>
											<Class>
											{item.agendaStatus == "XI" && (
												<IconStatus>
													<ButtonFinaly
														onClick={() =>
															this.setState({
																show: false,
																showStartClass: false,
																showCancel: false,
																showFinaly: true,
																sessionID: item.idAgenda,
																statusSession: item.nomeAluno,
															})
														}
													>Finalizar aula</ButtonFinaly>
												</IconStatus>
											)}
											</Class>
											<Class>
											{item.agendaStatus == "I" && (
												<IconStatus>
													<ButtonStart
														onClick={() =>
															this.setState({
																show: item.agendaStatus == "S" || item.agendaStatus == "I" || item.agendaStatus == "A" ? true : false,
																showStartClass: item.agendaStatus == "S" || item.agendaStatus == "I" || item.agendaStatus == "A" ? false : true,
																showCancel: false,
																sessionID: item.idAgenda,
																statusSession: item.agendaStatus,
															})
														}
													>Finalizar aula</ButtonStart>
												</IconStatus>
											)}
											</Class>
										</Group>
									)}

									{(item.agendaStatus == "A") || (item.agendaStatus == "S") ? (
										<GroupStart>
											<ButtonStart
												onClick={() =>
													this.setState({
														//show: item.agendaStatus == "S" || item.agendaStatus == "A" ? true : false,
														show: this.verifyStartLesson(item.agendaStatus, false),
														showLesson: this.verifyStartLesson(item.agendaStatus, true),
														sessionID: item.idAgenda,
														statusSession: item.agendaStatus,
													})
												}
											>Iniciar aula</ButtonStart>
										</GroupStart>
									):('')}
									
								</Description>
							</Item>
						))}
				</Students>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.common.loading,
	serialNumber: state.common.serialNumber,
	error: state.common.error,
	success:state.common.success, 
	list: state.student.list,
	status: state.common.status,
	statusCancel: state.student.statusCancel,
	lessonLast: state.student.lessonLast,
	lesson: state.student.lesson
});

const mapDispatchToProps = dispatch => ({
	onClickGoBackHome() {
		dispatch(push('/'));
	},
	onLoadSerialNumber() {
		dispatch(CommonAction.getItem('serialNumber'));
	},
	onClickSetStudentAndGoScan(values) {
		dispatch(CommonAction.setItem('ID_SESSION', values.sessionID));
		dispatch(CommonAction.setItem('START_COURSE', values.period));
		dispatch(StudentAction.getFingers(values.sessionID, values.period));
	},
	onLoadListClass() {
		dispatch(ScanAction.init());
		dispatch(StudentAction.loadListClass());
	},
	onValidateTicketStudent(values) {
		console.log('Validando Ticket....')
		dispatch(StudentAction.getValidarTicket(values.sessionID, values.period));
	},
	onCancelClassStudent(sessionID) {
		console.log('Cancelando....');
		dispatch(StudentAction.postCancelClassStudent(sessionID));
	},
	onLastLessonStudent(sessionID) {
		console.log('Concluir Aula....');
		dispatch(StudentAction.lastLessonStudent(sessionID));
	},
	onStartLessonStudent(sessionID) {
		console.log('Iniciando a Aula....');
		dispatch(StudentAction.startLessonStudent(sessionID));
	},
	onClickClearError() {
		dispatch(CommonAction.clearError());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(List);