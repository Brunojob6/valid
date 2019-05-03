import React from 'react';
import styled, { keyframes } from 'styled-components';
import FingerPrint from './FingerPrint';
import FingerScan from './FingerScan';
import type { Loading as LoadingType } from '../../flow';

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const fadeOut = keyframes`
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
`;

const Container = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: ${props => props.display};
	flex-direction: column;
	background: rgba(0, 0, 0, 0.35);
	align-items: center;
	justify-content: center;
	opacity: 0;
	animation: ${props => (props.loading ? `${fadeIn} ease-in 1` : `${fadeOut} ease-out 1`)};
	animation-fill-mode: forwards;
	animation-duration: 1s;
	z-index: 9;
`;

const Text = styled.h2`
	aling-text: center;
	color: #FF2400;
	font-family: 'Open Sans', sans-serif;
`;

// @flow
type Props = {
	loading?: LoadingType
}

type State = {
	display: string
}

class Loading extends React.Component<Props, State> {
	state = {
		display: 'none',
		img: '',
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loading.status !== this.props.loading.status) {
			if (!nextProps.loading.status) {
				setTimeout(() => this.setState({ display: 'none' }), 1000);
			} else {
				this.setState({ display: 'flex', img: JSON.parse(localStorage.getItem("IMG_BASE64"))});
			}
		}
	}
	componentWillUnmount() {
		this.setState();
	}
	setIMG() {
		return  (
			<img src={"data:image/png;base64," + this.props.loading.message} width={100} height={120} margin-right={"12px"}/>
		);
	}
	render() {
		if(this.state.img == null){
			return (
				<Container
					loading={this.props.loading.status}
					display={this.state.display}
				>	
					<FingerPrint />
					<Text>{this.props.loading.message}</Text>
					{localStorage.setItem("IMG_BASE64", null)}
				</Container>
			);
		} else {
			return (
				<Container
					loading={this.props.loading.status}
					display={this.state.display}
				>	
					<img src={"data:image/png;base64," + this.props.loading.message} width={100} height={120} margin-right={"12px"}/>
					<Text>Validando biometria</Text>
					{localStorage.setItem("IMG_BASE64", null)}
				</Container>
			);
		}
	}
}

export default Loading;
