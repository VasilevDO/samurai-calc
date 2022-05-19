import styled from 'styled-components';
import appStyle from '../styles/app.style';
import buttonStyle from '../styles/button.style';

interface ButtonProps {
    text:string|number,
    action:(_value:number|string)=>void,
    style?: string
}

const Container = styled.button<{styleScheme:string}>`
    display:table-cell;
    vertical-align:middle;    

    height:calc(2em + 8px);
    width:calc(2em + 8px);

    margin: 0 10px;

    border-radius:50%;

    cursor:pointer;
    font-size:1em;
    line-height:1em;
    font-weight: inherit;

    text-align: center;

    border:none;

    &:active {
        transform: scale(0.95);
    }

    ${props => props.styleScheme}

    @media only screen and (max-width: ${appStyle.screenWidth.med}) {
        margin: 0;
    }

`;

const Button = (props:ButtonProps) => {
	const {text, action, style} = props;
	const styleToImplement = style ? style : buttonStyle.primary;

	return (
		<Container styleScheme={styleToImplement} onClick={ () => action(text)}>
			{text}
		</Container>
	);
};

export default Button;
