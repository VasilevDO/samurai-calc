import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Controls from '../Components/Controls.component';
import Screen from '../Components/Screen.component';
import controls from '../consts/samuraiCalc.const';
import {handleButtonClick, setScreen} from '../redux/samuraiCalc/samuraiCalc.action';
import {RootState} from '../redux/store';

const Wrapper = styled.div`
	display:inline-block;
	padding: 38px 31px;
	background: #FFFFFF33;
	backdrop-filter: blur(4px);
	border-radius: 18px;
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
        margin-bottom: 1em;
    }
`;

const SamuraiCalc = () => {
	const dispatch = useDispatch();

	const state = useSelector((state:RootState) => state.samuraiCalc);
	const {screen} = state;

	const handleControlsClick = (val:number|string):void => {
		dispatch(handleButtonClick(val));
	};

	const handleScreenChange = (val:string):void => {
		dispatch(setScreen(val));
	};

	return (
		<Wrapper>
			<Container>
				<Screen text={screen} changeAction={handleScreenChange}/>
				<Controls controls={controls} clickHandler={handleControlsClick}/>
			</Container>
		</Wrapper>
	);
};

export default SamuraiCalc;
