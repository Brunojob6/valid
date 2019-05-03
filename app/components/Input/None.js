import React from 'react';
import styled from 'styled-components';


const Input = styled.input`
`;

// @flow

type InputType = {
	name: string;
	value?: string;
	onBlur?: Function;
	onChange?: Function;
	onFocus?: Function;
}

type Props = {
	input: InputType;
}

const None = (props: Props) => (
	<Input
		type="hidden"
		{...props.input}
	/>
);

export default None;
