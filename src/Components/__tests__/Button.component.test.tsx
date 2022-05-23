import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import Button from '../Button.component';

describe('ButtonComponent', () => {
	const buttonRole = 'button';
	const buttonText = 'text';
	const buttonAction = jest.fn();
	const buttonStyle = `
		color: black;
	`;

	test('should render button with correct text (no style provided)', () => {
		const {container} = render(<Button text={buttonText} action={buttonAction}/>);
		expect(container).toMatchSnapshot();
	});
	test('should render button with correct text (style provided)', () => {
		const {container} = render(<Button text={buttonText} action={buttonAction} style={buttonStyle}/>);
		expect(container).toMatchSnapshot();
	});
	test('should call props action function with text on click', () => {
		const {getByRole} = render(<Button text={buttonText} action={buttonAction}/>);
		const element = getByRole(buttonRole);
		fireEvent.click(element);
		expect(element).toBeInTheDocument();
		expect(buttonAction).toHaveBeenCalledWith(buttonText);
	});
});

