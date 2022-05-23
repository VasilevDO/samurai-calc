import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import History from '../History.component';

describe('HistoryComponent', () => {
	const history = ['1', '2', '3'];

	test('should render correct element', () => {
		const {container} = render(<History history={history}/>);
		expect(container).toMatchSnapshot();
	});
});

