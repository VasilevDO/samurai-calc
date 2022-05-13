import styled from 'styled-components';
import React from 'react';

import appStyle from '../styles/app.style';

interface InputProps {
    value:string,
    changeAction:(value:string)=>void,
    keyDownAction?: (key:React.KeyboardEvent<HTMLInputElement>)=>any
}

const Container = styled.input`
    width:100%;
    height: 76px;
    color: inherit;
    font-size: inherit; 
    line-height: 80px;
    font-weight:inherit;
    text-align: right;
    background-color: inherit;
    border: none;

    &:focus {
        outline: none;
        box-shadow: 0px 2px 0px 0px rgba(255, 255, 255);
    }

    @media only screen and (max-width: ${appStyle.screenWidth.med}) {
        height: 1.5em;
        
        >:not(:last-child) {
            margin-bottom: 14px;
        }
    }
`;

const Input = (props:InputProps) => {
	const {value, changeAction, keyDownAction} = props;

	const handleKeyDown = keyDownAction
		? (e:React.KeyboardEvent<HTMLInputElement>) => {
			keyDownAction(e);
		}
		: null;

	return (
		<Container value={value} onKeyDown={handleKeyDown} onChange={e => changeAction(e.target.value)}/>
	);
};

export default Input;
