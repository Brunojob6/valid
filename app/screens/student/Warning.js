import React from 'react';
import styled from 'styled-components';

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

const Warnig = Row.extend`

`;

const Message = styled.h3`
	font-weight: bold;
`;
// @flow

type Props = {
	sessionID: string;
}

const Warning = (props: Props) => (
    <React.Fragment>
        <Warnig><Message>Somente aulas com status agendada pode inicar aula ou status inicializada pode finalizar aula !</Message></Warnig>
        <Actions>
            <Default onClick={() => props.onCancel()}>
                OK
            </Default>
        </Actions>
    </React.Fragment>
);

export default Warning;