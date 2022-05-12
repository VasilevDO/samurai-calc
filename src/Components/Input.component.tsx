import styled from 'styled-components';

interface InputProps {
    value:string,
    changeAction:(value:string)=>void
}

const Container = styled.input`
    width: calc(100% - 1em);    

    border-radius:0.5em;
    border: 1px solid gray;

    padding: 0.5em;

    font-size: inherit; 
    font-weight:inherit;
    text-align: right;
`;

const Input = (props:InputProps) => {
	const {value, changeAction} = props;
	return (
		<Container value={value} onChange={e => changeAction(e.target.value)}/>
	);
};

export default Input;
