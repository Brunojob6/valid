import React from 'react';
import styled from 'styled-components';
import { Form as FinalForm, Field } from 'react-final-form';

import { Validate } from '../../utils/';
import { Input } from '../../components';

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Actions = Row.extend`
	display: flex;
	width: 90%;
	aling-items: flex-start;
	justify-content: space-around;
`;

const Button = styled.button`
	height: 40px;
	width: 100px;
	border: none;
	border-radius: 3px;
	font-size: 20px;
	font-weight: 500;
	font-family: 'Roboto', sans-serif;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	&:active {
		box-shadow: 0 0 0 rgba(0,0,0,0.12), 0 0 0 rgba(0,0,0,0.24);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
	&:focus {
		outline-width: 0;
	}
`;

const Primary = Button.extend`
	background: #007bff;
	color: #FFF;
	cursor: pointer;
`;

const Default = Button.extend`
	background: #f8f9fa;
	color: #000;
	cursor: pointer;
`;

// @flow

type Props = {
	onClick: Function;
	sessionID: string;
	onCancel: Function;
}

const QuestionCancel = (props: Props) => (
	//
	<FinalForm
		onSubmit={props.onClick}
		initialValues={{
			sessionID: props.sessionID,
			period: props.statusSession
		}}
		render={({
			handleSubmit,
		}) => (
			<React.Fragment>
				<Field
					placeholder={"Você deseja realmente cancelar a aula de "+ props.statusSession+ " ?"}
					component={Input.Radio}
					// validate={Validate.required}
					name="period"
					options={
						props.statusSession == "S" || props.statusSession == "A" ? 
						[	{ key: 'initial', checked: true, label: 'Iniciando', value: '1', status: props.statusSession == "A" ? false: false },
						]
							: 
						[	
							{ key: 'finish',  checked: true, label: 'Finalizando', value: '2', status: props.statusSession == "A"  ? false: false },
						]
					}
				/>
				<Field
					component={Input.None}
					name="sessionID"
				/>
				<Actions>
					<Primary onClick={() => handleSubmit()}>
						Confirmar
					</Primary>
					<Default onClick={() => props.onCancel()}>
						Cancelar
					</Default>
				</Actions>
			</React.Fragment>
		)}
	/>
);

export default QuestionCancel;