import styled from 'styled-components';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux.hook';
import Controls from '../Components/Controls.component';
import Screen from '../Components/Screen.component';
import controls from '../consts/samuraiCalc.const';
import {handleButtonClick, handleScreenInputChange} from '../redux/samuraiCalc/samuraiCalc.action';
import appStyle from '../styles/app.style';

const Wrapper = styled.div`
	display:inline-block;
	padding: 38px 31px;
	background: #FFFFFF33;
	backdrop-filter: blur(4px);
	border-radius: 18px;

	@media only screen and (max-width: ${appStyle.screenWidth.med}) {
		width: 100%;
        padding: 10px;
    }
`;

const Container = styled.div`
	display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    font-family: 'Geometria';
	font-style: normal;
	font-weight: 500;
	font-size: 36px;
	line-height: 88px;

	text-align: center;

	color: #F2F2F2;

    padding:16px 48px 44px 46px;
    border-radius: 18px;

	background: linear-gradient(155.23deg, #28518E 0%, #3A77D1 100%);
	box-shadow: 0px 82px 158px rgba(0, 0, 0, 0.35), 0px 24.7206px 47.6324px rgba(0, 0, 0, 0.228056), 0px 10.2677px 19.7841px rgba(0, 0, 0, 0.175), 0px 3.71362px 7.1555px rgba(0, 0, 0, 0.121944);

    > *:not(:last-child) {
        margin-bottom: 37px;
    }

	@media only screen and (max-width: ${appStyle.screenWidth.med}) {
        width:100%;
        font-size:20px;
		line-height: 36px;
		padding: 20px;

		> *:not(:last-child) {
			margin-bottom: 16px;
		}
    }
`;

const SamuraiCalc = () => {
	const dispatch = useAppDispatch();

	const state = useAppSelector(state => state.samuraiCalc);
	const {screen, history, historyLength} = state;

	const handleControlsClick = (val:number|string):void => {
		const valueToDispatch = String(val);
		dispatch(handleButtonClick(valueToDispatch));
	};

	const handleScreenChange = (val:string):void => {
		dispatch(handleScreenInputChange(val));
	};

	const handleScreenKeyDown = (e:React.KeyboardEvent<HTMLInputElement>):void => {
		if (e.key === '=' || e.key === 'Enter') {
			e.preventDefault();
			dispatch(handleButtonClick('='));
			return;
		}

		if (e.key === 'C') {
			e.preventDefault();
			dispatch(handleButtonClick('C'));
		}
	};

	const historyToShow = history.slice(-historyLength);

	return (
		<Wrapper>
			<Container>
				<Screen history={historyToShow} text={screen} changeAction={handleScreenChange} keyDownAction={handleScreenKeyDown}/>
				<Controls controls={controls} clickHandler={handleControlsClick}/>
			</Container>
		</Wrapper>
	);
};

export default SamuraiCalc;
