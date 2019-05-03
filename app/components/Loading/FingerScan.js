import React from 'react';
import styled, { keyframes } from 'styled-components';

const dash = keyframes`
	0% {
		fill: #FA8072;
	}
	50% {
		fill: #FF2400;
	}
	100% {
		fill: #7C0402;
	}
`;

const Main = styled.g`
	fill: #ED2939;
`;

const Path = styled.path`
	fill: #ED2939;
	animation: ${dash} 2s ease alternate infinite;
	&:nth-child(2) {
		animation-delay: 0.1s;
	}
	&:nth-child(3) {
		animation-delay: 0.2s;
	}
	&:nth-child(4) {
		animation-delay: 0.3s;
	}
	&:nth-child(5) {
		animation-delay: 0.4s;
	}
	&:nth-child(6) {
		animation-delay: 0.5s;
	}
	&:nth-child(7) {
		animation-delay: 0.6s;
	}
	&:nth-child(8) {
		animation-delay: 0.7s;
	}
	&:nth-child(9) {
		animation-delay: 0.8s;
	}
	&:nth-child(10) {
		animation-delay: 0.9s;
	}
	&:nth-child(11) {
		animation-delay: 0.10s;
	}
	&:nth-child(12) {
		animation-delay: 0.11s;
	}
	&:nth-child(13) {
		animation-delay: 0.12s;
	}
	&:nth-child(14) {
		animation-delay: 0.13s;
	}
	&:nth-child(15) {
		animation-delay: 0.14s;
	}
	&:nth-child(16) {
		animation-delay: 0.15s;
	}
	&:nth-child(17) {
		animation-delay: 0.16s;
	}
	&:nth-child(18) {
		animation-delay: 0.17s;
	}
	&:nth-child(19) {
		animation-delay: 0.18s;
	}
	&:nth-child(20) {
		animation-delay: 0.19s;
	}
	&:nth-child(21) {
		animation-delay: 0.20s;
	}
	&:nth-child(22) {
		animation-delay: 0.21s;
	}
`;

const SVG = styled.svg`
`;


const FingerScan = () => (
	<SVG
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 512.341 512.341"
		width="140px"
		height="140px"
		xmlSpace="preserve"
	>
		<Main>
            <img src={"data:image/png;base64," + "img" } width={100} height={120} margin-right={"12px"}/>
		</Main>
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
		<g />
	</SVG>
);

export default FingerScan;
