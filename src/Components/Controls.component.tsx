import styled from 'styled-components';
import buttonStyle from '../styles/button.style';
import Button from './Button.component';

interface ControlsProps {
    controls:(string|number)[],
    clickHandler:(_val:number|string)=>void
}

const Container = styled.div`
    display:grid;
    grid-template-columns:repeat(4,auto);
    grid-gap: 16px 20px;
    justify-content: center;
    align-content: center;
`;

const Controls = (props:ControlsProps) => {
	const {controls, clickHandler} = props;

	return (
		<Container data-testid="controls">
			{controls.map(u => <Button
				key={u}
				text={u}
				action={clickHandler}
				style={u === '=' ? buttonStyle.secondary : buttonStyle.primary}
			/>)}
		</Container>
	);
};

export default Controls;
