import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import Controls from '../Controls.component';

describe('ControlsComponent', () => {
	const controls = [1, 2, '3', '='];
	const action = jest.fn();
	const testId = 'controls';

	test('should render a correct element', () => {
		const {getByTestId} = render(<Controls controls={controls} clickHandler={action}/>);
		const element = getByTestId(testId);
		expect(element).toBeInTheDocument();
		expect(element).toHaveTextContent(controls.join(''));
	});
});

