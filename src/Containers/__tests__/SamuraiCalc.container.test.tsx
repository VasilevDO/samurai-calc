import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import SamuraiCalc from '../SamuraiCalc.container';
import * as reduxHooks from '../../hooks/redux.hook';

const useDispatchSpy = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockDispatchFn = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatchFn);

const useSelectorSpy = jest.spyOn(reduxHooks, 'useAppSelector');
const initialState = {
	screen: '123', history: ['1', '2', '3'], historyLength: 3, isTouchScreen: false,
};
useSelectorSpy.mockReturnValue(initialState);

describe('With React Testing Library', () => {
	test('should render button with correct text (no style provided)', () => {
		const {container} = render(<SamuraiCalc />);
		expect(container).toMatchSnapshot();
	});
});
