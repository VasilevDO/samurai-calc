import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ISamuraiCalcState {
	screen:string;
	history:string[];
	historyLength: number;
	decimals:number;
	isTouchScreen: boolean;
}

export const initialState:ISamuraiCalcState = {
	screen: '0',
	history: [],
	historyLength: 3,
	decimals: 4,
	isTouchScreen: false,
};

const sliceName = 'samuraiCalc';

const samuraiCalcSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setScreen(state, action:PayloadAction<string>) {
			state.screen = action.payload;
		},
		historyPush(state, action:PayloadAction<string>) {
			state.history = [...state.history, action.payload];
		},
		setScreenType(state, action:PayloadAction<boolean>) {
			state.isTouchScreen = action.payload;
		},

	},

});
export default samuraiCalcSlice;
