import {cleanup, fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../Button.component';

afterEach(cleanup);

describe('ButtonComponent', () => {
	const buttonRole = 'button';
	const buttonText = 'text';
	const buttonAction = jest.fn();
	const buttonStyle = '';

	test('should render button with correct text (no style provided)', () => {
		const {getByRole} = render(<Button text={buttonText} action={buttonAction}/>);
		const element = getByRole(buttonRole);
		expect(element).toBeInTheDocument();
		expect(element).toHaveTextContent(buttonText);
	});
	test('should render button with correct text (style provided)', () => {
		const {getByRole} = render(<Button text={buttonText} action={buttonAction} style={buttonStyle}/>);
		const element = getByRole(buttonRole);
		expect(element).toBeInTheDocument();
		expect(element).toHaveTextContent(buttonText);
	});
	test('should call props action function with text on click', () => {
		const {getByRole} = render(<Button text={buttonText} action={buttonAction}/>);
		const element = getByRole(buttonRole);
		fireEvent.click(element);
		expect(element).toBeInTheDocument();
		expect(buttonAction).toHaveBeenCalledWith(buttonText);
	});
});

