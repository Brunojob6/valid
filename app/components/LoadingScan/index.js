import React from 'react';
import styled, { keyframes } from 'styled-components';
import FingerScan from '../Loading/FingerScan';
import FingerPrint from '../Loading/FingerPrint';
import type { LoadingScan as LoadingTypeScan } from '../../flow';

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
	loadingScan?: LoadingTypeScan
}

type State = {
	display: string
}

class LoadingScan extends React.Component<Props, State> {
	state = {
        display: 'none',
        img: JSON.parse(localStorage.getItem("IMG_BASE64"))
	}

	componentDidMount () {
		console.log("Loading Scan");
		console.log(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.loadingScan.status !== this.props.loadingScan.status) {
			if (!nextProps.loadingScan.status) {
                {console.log("Passou SCANA")}
				setTimeout(() => this.setState({ display: 'none' }), 1000);
			} else {
                {console.log("Passou SCANAFLEX")}
				this.setState({ display: 'flex' });
			}
		}
	}

	render() {
		return (
			<Container
				loading={this.props.loadingScan.status}
				display={this.state.display}
            > 
                {/*
                    <img src={"data:image/png;base64," + this.props.loading.message} width={100} height={120} margin-right={"12px"}/>
                    <Text>Validando a Biometria</Text>
                */}
                <FingerPrint />
				<Text>{this.props.loadingScan.message}</Text>
			</Container>
		);
	}
}

export default LoadingScan;
