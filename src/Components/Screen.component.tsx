import styled from 'styled-components';

interface ScreenProps {
    text:string
}

const Container = styled.div`
    border-bottom:2px solid lightgrey;
    width:100%;
    font-size:1em;
    font-weight:inherit;
    padding: 5px 10px;

    > p {
        text-align:right;
    }
`;

const Screen = (props:ScreenProps) => {
	const {text} = props;
	return (
		<Container>
			<p>{text}</p>
		</Container>
	);
};

export default Screen;
