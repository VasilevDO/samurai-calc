import styled from 'styled-components';
import Button from './Button.component';

interface ControlsProps {
    controls:(string|number)[]
}

const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(4,auto);
    grid-gap: 1em;
    justify-content: center;
    align-content: center;
`;

const Controls = (props:ControlsProps) => {
	const {controls} = props;

	return (
		<Container>
			{controls.map(u => <Button key={u} text={u}/>)}
		</Container>
	);
};

export default Controls;
