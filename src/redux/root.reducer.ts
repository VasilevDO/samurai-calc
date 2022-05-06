import {combineReducers} from 'redux';
import samuraiCalcReducer from './samuraiCalc/samuraiCalc.reducer';

const rootReducer = combineReducers({
	samuraiCalc: samuraiCalcReducer,
});

export default rootReducer;
