import styled from 'styled-components';
import Input from './Input.component';

interface ScreenProps {
    text:string,
    changeAction?:(val:string)=>void
}

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;

    width: calc(100% - 1em);

    font-size:1em;

`;

const Screen = (props:ScreenProps) => {
	const {text, changeAction} = props;
	return (
		<Container>
			<Input value={text} changeAction={changeAction}/>
		</Container>
	);
};

export default Screen;
