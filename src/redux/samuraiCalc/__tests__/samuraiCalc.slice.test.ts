import samuraiCalcSlice, {ISamuraiCalcState} from '../SamuraiCalc.slice';

const {reducer, actions} = samuraiCalcSlice;

const initialState:ISamuraiCalcState = {
	screen: '0',
	history: [],
	historyLength: 3,
	decimals: 4,
	isTouchScreen: false,
};

describe('samuraiCalcReducer', () => {
	test('should return initial state', () => {
		expect(reducer(undefined, {type: null})).toEqual(initialState);
	});

	test('should handle a history push being added to an empty list', () => {
		const expectedState:ISamuraiCalcState = {
			screen: '0',
			history: ['1'],
			historyLength: 3,
			decimals: 4,
			isTouchScreen: false,
		};
		expect(reducer(initialState, actions.historyPush('1'))).toEqual(expectedState);
	});

	test('should handle a todo being added to an empty list', () => {
		const expectedState:ISamuraiCalcState = {
			screen: '123',
			history: [],
			historyLength: 3,
			decimals: 4,
			isTouchScreen: false,
		};
		expect(reducer(initialState, actions.setScreen('123'))).toEqual(expectedState);
	});

	test('should handle a todo being added to an empty list', () => {
		const expectedState:ISamuraiCalcState = {
			screen: '0',
			history: [],
			historyLength: 3,
			decimals: 4,
			isTouchScreen: true,
		};
		expect(reducer(initialState, actions.setScreenType(true))).toEqual(expectedState);
	});
});
