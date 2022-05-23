import styled from 'styled-components';
import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux.hook';
import Controls from '../Components/Controls.component';
import controls from '../consts/samuraiCalc.const';
import {inputUpdate, setScreenType} from '../redux/samuraiCalc/samuraiCalc.action';
import appStyle from '../styles/app.style';
import History from '../Components/History.component';
import Input from '../Components/Input.component';

const Wrapper = styled.div`
	display:inline-block;
	padding: 38px 31px;
	background: #FFFFFF33;
	backdrop-filter: blur(4px);
	border-radius: 18px;

	@media only screen and (max-width: ${appStyle.screenWidth.med}) {
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

	> hr {
		width:100%;
		border: 1px solid #FFFFFF;
		opacity: 0.35;
		margin-bottom: 37px;
	}

	> * {
		max-width:460px;
	}
	
    > *:first-child {
        margin-bottom: 28px;
    }

    > *:nth-child(2) {
        margin-bottom: 16px;
    }

	@media only screen and (max-width: ${appStyle.screenWidth.med}) {
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
	const {screen, history, historyLength, isTouchScreen} = state;
	console.log('STATE', state);

	useEffect(() => {
		const isTouchScreen = Boolean('ontouchstart' in window || navigator.maxTouchPoints);
		dispatch(setScreenType(isTouchScreen));
	}, []);

	const inputRef = useRef<HTMLInputElement>();

	const handleControlsClick = (val:number|string):void => {
		const valToInsert = String(val);
		if (valToInsert.includes('=') || valToInsert.includes('C')) {
			dispatch(inputUpdate(valToInsert));
			return;
		}

		const input = inputRef.current;

		const {value, selectionStart, selectionEnd} = input;

		const newInputValue = value.slice(0, selectionStart) + valToInsert + value.slice(selectionEnd);

		setTimeout(() => {// To place cursor caret
			if (isTouchScreen && selectionStart !== newInputValue.length) {
				input.setSelectionRange(-1, -1);
			} else if (!isTouchScreen && selectionStart !== value.length) {
				const caretPos = selectionStart + valToInsert.length;
				input.focus();
				input.setSelectionRange(caretPos, caretPos);
			}
		}, 0);

		dispatch(inputUpdate(newInputValue));
	};

	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
		const inputValue = e.target.value;
		dispatch(inputUpdate(inputValue));
	};

	const handleInputKeyDown = (e:React.KeyboardEvent<HTMLInputElement>):void => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const input = inputRef.current;
			dispatch(inputUpdate(input.value + '='));
		}
	};

	const historyToShow = history.slice(-historyLength);

	return (
		<Wrapper>
			<Container>
				<History history={historyToShow}/>
				<Input value={screen} onChange={handleInputChange} onKeyDown={handleInputKeyDown} ref={inputRef}/>
				<hr/>
				<Controls controls={controls} clickHandler={handleControlsClick}/>
			</Container>
		</Wrapper>
	);
};

export default SamuraiCalc;
