import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	height: 35px;
	width: 250px;
	padding: 5px;
	margin: 10px;
	padding-left: 10px;
	padding-right: 10px;
	background: #fff;
	cursor: not-allowed;
	color: #333;
	border: 3px solid #f7f9fa;
	box-shadow: 0 2px 2px #e1e7e9;
	-moz-box-shadow: 0 2px 2px #e1e7e9;
	-webkit-box-shadow: 0 2px 2px #e1e7e9;
	border-radius: 3px;
	font-size: 16px;
	font-family: 'Open Sans', sans-serif;
	font-weight: bold;
	text-transform: uppercase;
	text-align: center;
	&::-webkit-input-placeholder {
		text-transform: none;
	}
	&:focus {
		outline:none;
	}
`;

const Error = styled.span`
	color: #e44f5e;
	font-weight: bold;
	font-family: 'Open Sans', sans-serif;
	font-weight: 800i;
	font-size: 9px;
	margin-left: 5px;
	font-style: italic;
	opacity: ${props => (props.show ? 1 : 0)};
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
	transform: scale(${props => (props.show ? '1.0' : '1.1')});
	transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
	align-self: center;
`;

// @flow
type Meta = {
	touched?: boolean,
	error?: string
};

type InputType = {
	name: string,
	value: string,
	onBlur?: Function,
	onChange?: Function,
	onFocus?: Function
};

type Props = {
	input: InputType,
	meta: Meta,
	placeholder?: string,
	onKeyPress: Function,
	onDisabled: boolean
};

const Default = (props: Props) => (
	<Group>
		<Input
			autoFocus
			{...props.input}
			placeholder={props.placeholder}
			onKeyPress={props.onKeyPress}
			disabled={props.onDisabled}
		/>
		<Error show={props.meta.touched && props.meta.error}>
			{props.meta.error}
		</Error>
	</Group>
);

export default Default;
