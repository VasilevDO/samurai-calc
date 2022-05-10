import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Controls from '../Components/Controls.component';
import Screen from '../Components/Screen.component';
import controls from '../consts/samuraiCalc.const';
import {handleButtonClick} from '../redux/samuraiCalc/samuraiCalc.action';
import {RootState} from '../redux/store';

const Container = styled.div`
    background-color:lightblue;
    
    display:inline-flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    font-size:28px;
    font-weight: 500;

    padding:1em;
    border-radius:0.5em;

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

	return (
		<Container>
			<Screen text={screen}/>
			<Controls controls={controls} clickHandler={handleControlsClick}/>
		</Container>
	);
};

export default SamuraiCalc;
