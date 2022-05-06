import styled from 'styled-components';

interface ButtonProps {
    text:string|number
}

const Container = styled.button`
    display: table-cell;
    vertical-align: middle;

    height:2em;
    width:2em;
    border-radius:50%;

    cursor:pointer;
    font-size:1em;
    line-height:1em;
    font-weight: inherit;

    color:white;
    border:none;
    background-color: inherit;

    &:hover {
        background-color:rgba(0, 0, 0, 0.1);
    }

    &:active {
        border: 1px solid lightgrey;
    }
`;

const Button = (props:ButtonProps) => {
	const {text} = props;
	return (
		<Container>
			{text}
		</Container>
	);
};

export default Button;
