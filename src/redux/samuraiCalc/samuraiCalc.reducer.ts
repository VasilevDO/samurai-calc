import {SamuraiActionTypes} from './samuraiCalc.type';

const initialState = {
	screen: '0',
	decimals: 4,
};

interface SetScreenAction {
	type:SamuraiActionTypes.SET_SCREEN,
	payload:string
}

type SamuraiCalcAction = SetScreenAction;

const samuraiCalcReducer = (state = initialState, action:SamuraiCalcAction) => {
	switch (action.type) {
		case SamuraiActionTypes.SET_SCREEN:
			return {...state, screen: action.payload};
		default: return {...state};
	}
};

export default samuraiCalcReducer;
