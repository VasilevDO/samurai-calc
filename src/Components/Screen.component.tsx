import styled from 'styled-components';
import React from 'react';
import appStyle from '../styles/app.style';
import History from './History.component';
import Input from './Input.component';

interface ScreenProps {
    text:string,
    history: string[],
    changeAction?: (val:string)=>void,
    keyDownAction?: (key:React.KeyboardEvent<HTMLInputElement>)=>void
}

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;

    width:460px;

    font-size:56px;
    font-weight: 700;
    padding: 0 0 16px 0;
    border-bottom: 2px solid #FFFFFF59;

    >:not(:last-child) {
        margin-bottom: 28px;
    }

    
	@media only screen and (max-width: ${appStyle.screenWidth.med}) {
        width:100%;
        font-size:28px;
        font-weight: 500;

        >:not(:last-child) {
            margin-bottom: 14px;
        }
    }
`;

const Screen = (props:ScreenProps) => {
	const {text, history, changeAction, keyDownAction} = props;
	return (
		<Container>
			<History history={history}/>
			<Input value={text} changeAction={changeAction} keyDownAction={keyDownAction || null}/>
		</Container>
	);
};

export default Screen;
