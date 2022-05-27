import configureStore from 'redux-mock-store';
import * as actions from '../samuraiCalc.action';
import thunk from 'redux-thunk';
import {SAMURAI_CALC_INVALID_INPUT} from '../../../consts/samuraiCalc.const';

let mockStore:any;
const middlewares = [thunk];

beforeEach(() => {
	mockStore = configureStore(middlewares);
});

describe('samuraiCalc actions', () => {
	describe('setScreenType action', () => {
		test('should send correct actions to the store', () => {
			const store = mockStore();
			const expectedActions = [
				{payload: true, type: 'samuraiCalc/setScreenType'},
			];
			store.dispatch(actions.setScreenType(true));
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	describe('inputUpdate action', () => {
		const state = {
			samuraiCalc: {
				screen: '1+2',
				decimals: 4,
			},
		};

		test('should send correct actions to the store if new value contains resolve symbol', () => {
			const store = mockStore(state);
			const newInput = state.samuraiCalc.screen + '=';
			const expectedActions = [
				{payload: state.samuraiCalc.screen, type: 'samuraiCalc/historyPush'},
				{payload: '3', type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should send correct actions to the store if new value contains reset symbol', () => {
			const store = mockStore(state);
			const newInput = state.samuraiCalc.screen + 'C';
			const expectedActions = [
				{payload: '0', type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should cut unnecessary zeroes: multiple zeroes case', () => {
			const store = mockStore(state);
			const newInput = '001';
			const expectedActions = [
				{payload: '1', type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should cut unnecessary zeroes: 0 symbol', () => {
			const store = mockStore(state);
			const newInput = '0';
			const expectedActions = [
				{payload: '0', type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should send correct actions to the store if error occurs while calculating', () => {
			const store = mockStore(state);
			const newInput = '=%1//0';
			const expectedActions = [
				{payload: newInput.slice(1), type: 'samuraiCalc/historyPush'},
				{payload: SAMURAI_CALC_INVALID_INPUT, type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should send correct actions to the store if number is too small to match required decimals', () => {
			const store = mockStore(state);
			const newInput = '=1/100000000000';
			const expectedActions = [
				{payload: newInput.slice(1), type: 'samuraiCalc/historyPush'},
				{payload: '1e-11', type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should send correct actions to store if calculation resolves into NaN', () => {
			const store = mockStore(state);
			const newInput = '=1NaN';
			const expectedActions = [
				{payload: newInput.slice(1), type: 'samuraiCalc/historyPush'},
				{payload: SAMURAI_CALC_INVALID_INPUT, type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should send correct actions to store if brackets are not correct while calculating', () => {
			const store = mockStore(state);
			const newInput = '=(1+2';
			const expectedActions = [
				{payload: newInput.slice(1), type: 'samuraiCalc/historyPush'},
				{payload: SAMURAI_CALC_INVALID_INPUT, type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should send correct actions to store if unnecessary symbols occurs', () => {
			const store = mockStore(state);
			const newInput = '=+(+(+(++++1+2)))';
			const expectedActions = [
				{payload: newInput.slice(1), type: 'samuraiCalc/historyPush'},
				{payload: '3', type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});

		test('should send correct actions to store if unnecessary symols occurs: - case', () => {
			const store = mockStore(state);
			const newInput = '=+-+--1+2';
			const expectedActions = [
				{payload: newInput.slice(1), type: 'samuraiCalc/historyPush'},
				{payload: '1', type: 'samuraiCalc/setScreen'},
			];
			store.dispatch(actions.inputUpdate(newInput, state.samuraiCalc.decimals));
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
