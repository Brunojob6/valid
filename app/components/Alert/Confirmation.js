import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9;
	opacity: ${props => (props.show ? 1 : 0)};
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
	transform: scale(${props => (props.show ? '1.0' : '1.1')});
	transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
`;

const Content = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	padding: 1rem 1.5rem;
	width: 30rem;
	border-radius: 0.5rem;
`;

// @flow
type Props = {
	children?: React.Node,
	show: boolean;
};

const Confirmation = (props: Props) => (
	<Container show={props.show}>
		<Content>
			{props.children}
		</Content>
	</Container>
);

export default Confirmation;
