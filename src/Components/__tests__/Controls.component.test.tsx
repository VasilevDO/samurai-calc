import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import Controls from '../Controls.component';

describe('ControlsComponent', () => {
	const controls = [1, 2, '3', '='];
	const action = jest.fn();

	test('should render a correct element', () => {
		const {container} = render(<Controls controls={controls} clickHandler={action}/>);
		expect(container).toMatchSnapshot();
	});
});

