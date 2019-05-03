import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form as FinalForm, Field } from 'react-final-form';

import { Validate } from '../../utils/';

import { Loading, Input } from '../../components';
import FingerHome from '../../components/Loading/FingerHome';
import { CommonAction } from '../../actions';
import type { Loading as LoadingType } from '../../flow';
import readline from 'readline';
import fs from 'fs';

const Title = styled.h1`
	font-size: 1.5em;
	color: palevioletred;
	font-family: 'Open Sans', sans-serif;
`;

const TitleCFC = styled.h1`
	font-size: 1.4em;
	text-align: center;
	color: palevioletred;
	font-family: 'Open Sans', sans-serif;
`;


const Container = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	align-items: center;
`;

const Wrapper = styled.div`
	//flex: 1;
	flex: row;
	align-items: center;
`;

const WrapperEnd = styled.div`
	//flex: 1;
	//flex: row;
	//margin-left: 90%;
	//align-items: left;
	margin-bottom: 15px;
	margin-top:0;
`;

const Form = styled.div`
	display: flex;
	flex: 9;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Button = styled.button`
	height: 50px;
	width: 200px;
	background: #fa7d6c;
	color: #fff;
	cursor: pointer;
	border: none;
	border-radius: 3px;
	font-size: 20px;
	font-weight: 500;
	margin-bottom: 40px;
	margin-top: 20px;
	font-family: Catamaran;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	&:active {
		box-shadow: 0 0 0 rgba(0,0,0,0.12), 0 0 0 rgba(0,0,0,0.24);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
	&:focus {
		outline:none;
	}
`;

const Local = styled.footer`
	align-items: center;
	text-align: center;
`;

const Group = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

// @flow

type Props = {
	loading: LoadingType,
	onClickSetSerialNumber: Function,
	onLoadSerialNumber: Function,
	onLoadCFCName: Function,
	onLoadSim: Function,
	onLoadCFC: Function,
	serialNumber?: string,
	cfc?: string,
};

class Home extends React.Component<Props> {
	state = {
		dataLocal: '',
		hora: '',
		semana: ''
	}
	componentWillUnmount() {
		clearInterval(this.updateDataLoad);
	}

	componentDidMount(){
		console.log("DiD_MOUNT_HOME");
		this.removeLessonCacheHome();
		this.loadingDataCfc();
		this.updateDataLoad = setInterval(() => this.updateData(),1000);
	}

	componentWillMount() {
		if (this.props.serialNumber === undefined) {
			console.log("Bruno",this.props.onLoadCFCName())
			this.props.onLoadCFCName();
			this.props.onLoadSerialNumber();
		}
		//setInterval(() => this.removeLessonCacheHome(), 20000);
	}

	//Config Data Hora Local
	getMonthExtensive(mes){
		let arrayMes = new Array(12);
		arrayMes[0] = "Janeiro";arrayMes[1] = "Fevereiro";arrayMes[2] = "Março";arrayMes[3] = "Abril";
		arrayMes[4] = "Maio";arrayMes[5] = "Junho";arrayMes[6] = "Julho";arrayMes[7] = "Agosto";
		arrayMes[8] = "Setembro";arrayMes[9] = "Outubro";arrayMes[10] = "Novembro";arrayMes[11] = "Dezembro";
		
		return arrayMes[mes];
	}

	getDiaExtenso(dia){
		let arrayDia = new Array(7);
		arrayDia[0] = "Domingo";arrayDia[1] = "Segunda-Feira";arrayDia[2] = "Terça-Feira";
		arrayDia[3] = "Quarta-Feira";arrayDia[4] = "Quinta-Feira";arrayDia[5] = "Sexta-Feira";
		arrayDia[6] = "Sabado";
		
		return arrayDia[dia];
	}

	displayData(hora, diaSemana, dia, mes, year){
		let data  = ""+hora+" ";
		data += ""+diaSemana+", "+dia+" de "+mes+" de "+year;
		this.setState({
			dataLocal: data,
			hora: hora,
			semana: dia+" de "+mes+" de "+year
		});
		return true;
	}

	convertDigit(number) {
		let a = number.toString();
		let result = a.length == 1 ? '0'+number : number;
		return result;
	}

	updateData(){ 
		console.log("UPDATE_DATA");
		let currentDate = new Date();
		let day = currentDate.getDate();
		let diaSemana = this.getDiaExtenso(currentDate.getDay());
		let month = this.getMonthExtensive(currentDate.getMonth());
		let year = currentDate.getFullYear();
		let time = currentDate.getHours();
		let minuto = currentDate.getMinutes();
		let segundo = currentDate.getSeconds();

		time = this.convertDigit(time);
		minuto = this.convertDigit(minuto);
		segundo = this.convertDigit(segundo);
        day = this.convertDigit(day);
		let horaImprimivel = time + ":" + minuto + ":" + segundo;
		this.displayData(horaImprimivel, diaSemana, day, month, year);
	} 
	
	removeLessonCacheHome() {
		console.log('Remove ......... Home');
		let learned = JSON.parse(localStorage.getItem("AULAS_CAPTURADAS"));
		learned = learned === null ? [] : learned;
		let data_new = new Date();
		if(learned.length > 0 ) {
			learned = learned.filter( lesson => new Date(lesson.endClass) > data_new);
			localStorage.setItem("AULAS_CAPTURADAS", JSON.stringify(learned));
		}
	}

	loadingDataCfc() {
		let countLine = 0;
		const readable = fs.createReadStream('info.txt');
		const rl = readline.createInterface({
			input: readable,
			//output:process.stdout
		});
		rl.on('line', (line) => {
			countLine++;
			if(countLine == 1) {
				console.log("CFC:"+line)
				localStorage.setItem("CFC", JSON.stringify(line));
				this.props.onLoadCFC(line);
			}
			if(countLine == 2) {
				this.props.onLoadSim(line);
			}
		})
	}

	handleKeyPress(e, fn) {
		if (e.key === 'Enter') {
			fn();
		}
	}

	initialValues() {
		//SIM01140018
		return {
			serialNumber: this.props.serialNumber,
			cfc: this.props.cfc,
		};
	}
	
	pad(s) {
        return (s < 10) ? '0' + s : s;
	}
	
	infoLocal() {
		let date = new Date();
		return [date.getHours(), date.getMinutes()].map(this.pad).join(':');
	}
	render() {
		return (
			<Container>
				<Loading
					loading={this.props.loading}
				/>
				<Wrapper>
					<Title>
						VALIDA BIO AUTO SMARTSIM DATE
					</Title>
					<TitleCFC>{JSON.parse(localStorage.getItem("CFC"))}</TitleCFC>
				</Wrapper>
				<FinalForm
					onSubmit={this.props.onClickSetSerialNumber}
					initialValues={this.initialValues()}
					render={({
						handleSubmit,
					}) => (
						<Form>
							<Group>
								<FingerHome/>
							</Group>
							<Field
								placeholder="Digite o Número Serial"
								component={Input.Default}
								validate={Validate.required}
								name="serialNumber"
								onKeyPress={e => this.handleKeyPress(e, () => handleSubmit())}
								onDisabled={true}
							/>
							<Button onClick={() => handleSubmit()}>
								Acessar
							</Button>
							<Wrapper>
								<Local>
								<h1>{this.state.semana}</h1>
								<h2>{this.state.hora}</h2>
								</Local>
							</Wrapper>			
						</Form>
					)}
				/>
				<WrapperEnd>
					<b>Versão </b>2.0.1
				</WrapperEnd>	
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.common.loading,
	serialNumber: state.common.serialNumber,
	cfc: state.common.cfc,
});

const mapDispatchToProps = dispatch => ({
	onClickSetSerialNumber(values) {
		dispatch(CommonAction.setSerialNumber(values.serialNumber.toUpperCase()));
		dispatch(push('/list'));
		dispatch(CommonAction.setItem('serialNumber', values.serialNumber.toUpperCase()));
	},
	onLoadSerialNumber() {
		dispatch(CommonAction.getItem('serialNumber'));
	},
	onLoadSim(sim) {
		dispatch(CommonAction.setItem('serialNumber', sim.toUpperCase()));
	},
	onLoadCFC(cfc) {
		dispatch(CommonAction.setCfc('cfc', cfc));
	},
	onLoadCFCName() {
		dispatch(CommonAction.getCfc('cfc'));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
