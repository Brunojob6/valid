import React from 'react';
import styled from 'styled-components';

import Arrow from '../Arrow';

const Container = styled.div`
	width: 90vw;
	padding-top: 25px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.span`
	color: palevioletred;
	font-weight: bold;
	font-family: 'Open Sans', sans-serif;
`;

const Hr = styled.hr`
	width: 90vw;
	border: 0;
	height: 0;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const Button = styled.button`
	border: 0;
	border-radius: .4em;
	font-weight: 900;
	&:focus {
		outline-width: 0;
	}
`;

const SerialButton = Button.extend`
	width: 120px;
	height: 30px;
	background: rgba(0,0,0,0);
	color: #000;
	&:hover  {
		background: #000;
		color: #FFF;
	}
	&:active {
		box-shadow: 0 0px 0px rgba(0,0,0,0.25), 0 0px 0px rgba(0,0,0,0.22);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
`;

const Options = styled.button`
	position: absolute;
	width: 80px;
	height: 30px;
	top: 68px;
	right: 60px;
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	opacity: ${props => props.opacity}
	z-index: 3;
	background: #dc3545;
	border-radius: .4em;
	border: 0;
	color: #FFF;
	font-weight: 900;
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 0;
		height: 0;
		border: 1.119em solid transparent;
		border-bottom-color: #dc3545;
		border-top: 0;
		margin-left: -1.119em;
		margin-top: -1.119em;
	}
	&:focus {
		outline-width: 0;
	}
	&:active {
		box-shadow: 0 0 0 rgba(0,0,0,0.12), 0 0 0 rgba(0,0,0,0.24);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
`;

const UpdateButton = styled.button`
	border: 0;
	background: rgba(0,0,0,0);
	color: #000;
	&:focus {
		outline-width: 0;
	}
	&:active {
		box-shadow: 0 0px 0px rgba(0,0,0,0.25), 0 0px 0px rgba(0,0,0,0.22);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
`;

const ButtonCustom = styled.div`
	#display: block;
	display: ${props => props.display} 
`;

const ButtonA = styled.a`
	text-decoration: none;
	display: inline-block;
	border-radius: 3px;	
	color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle
	touch-action: manipulation;
	cursor: pointer;
	user-select: none;
    background-image: none;
	border: 1px solid transparent;
	border-radius: .4em;
    padding: 1px 9px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	&:hover {
		color: #fff;
    	background-color: #286090;
		border-color: #204d74;
	
	}
`;
const ButtonSpan = styled.span`
	position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -webkit-font-smoothing: antialiased;

`;

// @flow
type HeadProps = {
	serialNumber?: string,
	goHome: Function,
	goList?: Function,
	display?: string,
	clickUpdate?: Function
}

type HeadState = {
	opacity: number;
}

class Head extends React.Component<HeadProps, HeadState> {
	state = {
		opacity: 0,
	};

	renderTitleOrBackButton() {
		if (this.props.goList !== undefined) {
			return (
				<Arrow
					onClick={this.props.goList}
					color="#000"
					hover="#fff"
				/>
			);
		}

		return (
			<Title>
				VALIDA BIO AUTO SMARTSIM
			</Title>
		);
	}

	render() {
		return (
			<React.Fragment>
				<Container>
					{ this.renderTitleOrBackButton() }
					{this.props.clickUpdate !== undefined && (
						<UpdateButton onClick={() => this.props.clickUpdate()}>
							{/*
							 <button>
							 	<i className="fa fa-repeat" />  Atualizar lista de aulas
							 </button>
							  */}
							 <ButtonCustom display={this.props.display}>
								 <ButtonA>
									 <ButtonSpan>
									 <i className="fa fa-repeat" /> 
							 			<b> Atualizar lista de aulas</b>
									 </ButtonSpan>
								 </ButtonA>
							 </ButtonCustom>
						</UpdateButton>
					)}
					<SerialButton
						onClick={() => {
							const { opacity } = this.state;
							const newOpacity = (opacity === 1 ? 0 : 1);
							this.setState({ opacity: newOpacity });
						}}
					>
						{this.props.serialNumber}
					</SerialButton>
					<Options
						opacity={this.state.opacity}
						onClick={() => this.props.goHome()}
					>
						Sair
					</Options>
				</Container>
				<Hr />
			</React.Fragment>
		);
	}
}

export default Head;
