import styled from 'styled-components';
import {forwardRef, ChangeEvent, KeyboardEvent, Ref} from 'react';

import appStyle from '../styles/app.style';

interface IInputProps {
    value:string,
    onChange:(_e:ChangeEvent<HTMLInputElement>)=>void,
    onKeyDown?: (_e:KeyboardEvent<HTMLInputElement>)=>void,
}

const Container = styled.input`
    width: 100%;
    height: 76px;
    color: inherit;
    text-align: right;
    background-color: inherit;
    border: none;

    margin-bottom: 18px;

    font-weight: 700;
    font-size: 56px;
    line-height: 80px;

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: ${appStyle.screenWidth.med}) {
        height: 1.5em;

        font-weight: 500;
        font-size: 28px;
        line-height: 40px;
        
        >:not(:last-child) {
            margin-bottom: 14px;
        }
    }
`;

const Input = forwardRef((props:IInputProps, ref:Ref<HTMLInputElement>) => (
	<Container data-testid="input" ref={ref} {...props}/>
));

Input.displayName = 'Input';

export default Input;
