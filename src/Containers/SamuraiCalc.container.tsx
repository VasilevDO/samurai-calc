import styled from 'styled-components';
import Controls from '../Components/Controls.component';
import Screen from '../Components/Screen.component';

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
	const controls = ['C', '√', '%', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', '00', 0, ',', '='];

	const screenText = 'kek';

	return (
		<Container>
			<Screen text={screenText}/>
			<Controls controls={controls}/>
		</Container>
	);
};

export default SamuraiCalc;
