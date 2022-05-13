import {combineReducers} from 'redux';
import SamuraiCalcSlice from './samuraiCalc/SamuraiCalc.slice';

const rootReducer = combineReducers({
	samuraiCalc: SamuraiCalcSlice.reducer,
});

export default rootReducer;
