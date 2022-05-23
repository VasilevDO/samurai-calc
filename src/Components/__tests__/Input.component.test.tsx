import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import Input from '../Input.component';

describe('InputComponent', () => {
	const testId = 'input';
	const initValue = 'value';
	const changeAction = jest.fn();

	test('should render a correct element', () => {
		const {container, getByTestId} = render(<Input value={initValue} onChange={changeAction}/>);
		const element = getByTestId(testId);
		expect(element).toBeInTheDocument();
		expect(element).toHaveValue(initValue);
		expect(container).toMatchSnapshot();
	});
});

