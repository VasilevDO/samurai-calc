import styled from 'styled-components';

interface ButtonProps {
    text:string|number,
    action:(value:number|string)=>void
}

const Container = styled.button`
    height:calc(2em + 8px);
    width:calc(2em + 8px);

    margin: 0 10px;

    border-radius:50%;

    cursor:pointer;
    font-size:1em;
    line-height:1em;
    font-weight: inherit;

    color:white;
    border:none;
    background-color: inherit;

    &:hover {
        background-color:rgba(255,255,255,0.12);
    }

    &:active {
        border: 1px solid lightgrey;
    }
`;

const Button = (props:ButtonProps) => {
	const {text, action} = props;
	return (
		<Container onClick={() => action(text)}>
			{text}
		</Container>
	);
};

export default Button;
