import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import History from '../History.component';

afterEach(cleanup);

describe('HistoryComponent', () => {
	const history = ['1', '2', '3'];
	const historyId = 'history';

	test('should render correct element', () => {
		const {getByTestId} = render(<History history={history}/>);
		const element = getByTestId(historyId);
		expect(element).toBeInTheDocument();
		expect(element).toHaveTextContent([...history].reverse().join(''));
	});
});

