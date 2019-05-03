import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	border: 0;
	border-radius: .4em;
	font-weight: 900;
	&:focus {
		outline-width: 0;
	}
`;

const G = styled.g`
	fill: #000;
`;

const BackButton = Button.extend`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0);
	&:hover  {
		background: #000;
		color: #FFF;
		${G} {
			fill: #fff;
		}
	}
	&:active {
		box-shadow: 0 0px 0px rgba(0,0,0,0.25), 0 0px 0px rgba(0,0,0,0.22);
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
`;

// @flow
const Arrow = ({
	onClick,
}: {
	onClick: Function;
}) => (
	<BackButton
		onClick={onClick}
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 512 512"
			xmlSpace="preserve"
			width="30px"
			height="25px"
		>
			<G>
				<g>
					<path d="M493.519,211.306c-11.937-11.936-27.807-18.509-44.727-18.509l-233.002-0.003l28.465-28.464
						c11.957-11.941,18.542-27.823,18.542-44.722c0-34.849-28.354-63.2-63.219-63.2c-16.874,0-32.741,6.573-44.681,18.512
						L18.601,211.22c-8.841,8.806-14.828,19.891-17.315,32.056C0.432,247.441,0,251.722,0,256.001c0,16.929,6.607,32.832,18.583,44.761
						l136.288,136.287c11.939,11.958,27.822,18.543,44.723,18.543c34.849,0,63.201-28.353,63.203-63.201
						c0.002-16.879-6.571-32.752-18.512-44.696l-28.493-28.493h233.034c16.886,0,32.76-6.574,44.694-18.513
						C518.16,276.045,518.16,235.949,493.519,211.306z"
					/>
				</g>
			</G>
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
		</svg>
	</BackButton>
);

export default Arrow;
