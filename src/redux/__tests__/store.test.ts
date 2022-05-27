import store from '../store';
import {initialState as samuraiCalcInitialState} from '../samuraiCalc/SamuraiCalc.slice';

describe('store', () => {
	test('should contain samuraiCalc reducer', () => {
		expect(store.getState().samuraiCalc).toEqual(samuraiCalcInitialState);
	});
});
