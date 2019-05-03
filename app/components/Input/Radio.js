import React from 'react';
import styled from 'styled-components';


const Label = styled.label`
	position: relative;
	font-family: 'Roboto', sans-serif;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
`;

const Input = styled.input`
	font-family: 'Roboto', sans-serif;
	&:checked,
	&:not(:checked) {
		position: absolute;
		left: -9999px;
	}
	&:checked + ${Label},
	&:not(:checked) + ${Label} {
		position: relative;
		padding-left: 28px;
		cursor: pointer;
		line-height: 20px;
		display: inline-block;
		color: #666;
	}
	&:checked + ${Label}:before,
	&:not(:checked) + ${Label}:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 18px;
		height: 18px;
		border: 1px solid #ddd;
		border-radius: 100%;
		background: #fff;
	}
	&:checked + ${Label}:after,
	&:not(:checked) + ${Label}:after {
		content: '';
		width: 12px;
		height: 12px;
		background: #28a745;
		position: absolute;
		top: 4px;
		left: 4px;
		border-radius: 100%;
		-webkit-transition: all 0.2s ease;
		transition: all 0.2s ease;
	}
	&:not(:checked) + ${Label}:after {
		opacity: 0;
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	&:checked + ${Label}:after {
		opacity: 1;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
`;

const Group = styled.span`
	margin: 5px;
	display: none;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px;
`;

const Row = styled.div`
	#display: 'none';
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Error = styled.span`
	color: #e44f5e;
	font-weight: bold;
	font-family: 'Open Sans', sans-serif;
	font-weight: 800i;
	font-size: 9px;
	font-style: italic;
	opacity: ${props => (props.show ? 1 : 0)};
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
	transform: scale(${props => (props.show ? '1.0' : '1.1')});
	transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
	align-self: center;
`;

const ContainerError = styled.div`
	height: 15px;
`;

const Placeholder = styled.h3`
	font-family: 'Roboto', sans-serif;
`;

// @flow
type Meta = {
	submitFailed?: boolean;
	error?: string;
}

type InputType = {
	name: string;
	value?: string;
	onBlur?: Function;
	onChange?: Function;
	onFocus?: Function;
}

type OptionType = {
	key: string;
	value: string;
	label: string;
}

type Props = {
	input: InputType,
	meta: Meta,
	placeholder?: string,
	options: Array<OptionType>
}

const Radio = (props: Props) => (
	<Column>
		<Placeholder>{props.placeholder}</Placeholder>
		<Row>
			{props.options.map(item => (
				<Group key={item.key}>
					<Input type="radio" id={item.key}
						status={item.status} disabled={item.status} value={item.value}
					/>
					<Label htmlFor={item.key}>
						{item.label}
					</Label>
				</Group>
			))}
		</Row>
		<ContainerError>
			<Error show={props.meta.submitFailed && props.meta.error}>
				{props.meta.error}
			</Error>
		</ContainerError>
	</Column>
);

export default Radio;