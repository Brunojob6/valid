import React from 'react';
import styled from 'styled-components';
import { SuccessType } from '../../flow';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Content = styled.div`
	position: absolute;
	transform: translate(-50%, -50%);
	background-color: #e44f5e;
	padding: 1rem 1.5rem;
	width: 25rem;
	border-radius: 0.5rem;
	opacity: ${props => (props.show ? 1 : 0)};
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
	transform: scale(${props => (props.show ? '1.0' : '1.1')});
	transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
	z-index: 9;
`;

const Title = styled.h3`
	color: #FFF;
`;

const Message = styled.h4`
	color: #FFF;
	font-weight: bold;
`;

const Close = styled.button`
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	position: absolute;
	top: 2%;
	right: 1%;
	border-radius: 5px;
	border: 0px;
	background: #ffffff;
	width: 20px;
	height: 20px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	&:hover {
		background: #ffffff;
		color: #000;
	}
	&:focus {
		outline: none;
		background: #ffffff;
		color: #000;
	}
	&:active {
		outline: none;
		background: #ffffff;
		box-shadow: 0 0 0 rgba(0,0,0,0.12), 0 0 0 rgba(0,0,0,0.24);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
`;

// @flow
type Props = {
	error?: SuccessType,
	onClose: Function
};

const SuccssA = (props: Props) => (
	<Container>
		<Content show={props.error !== undefined}>
			<Close onClick={() => props.onClose()}>X</Close>
			<Title>{props.error !== undefined ? props.error.status : ''}</Title>
			<Message>{props.error !== undefined ? props.error.message : ''}</Message>
		</Content>
	</Container>
);


export default SuccssA;
