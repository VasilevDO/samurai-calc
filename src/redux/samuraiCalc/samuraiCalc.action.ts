import {SAMURAI_CALC_INVALID_INPUT} from '../../consts/samuraiCalc.const';
import CalcModel from '../../models/Calc.model';
import store, {AppDispatch} from '../store';
import samuraiCalcSlice from './SamuraiCalc.slice';

const prepareToCalculate = (str:string) => {
	let prepStr = str;

	prepStr = prepStr.replace(/[+-]{2,}/g, match => match.split('')
		.reduce((a, u) => u === '+' ? a + 2 : a + 1, 0) % 2 ? '-' : '+');// Converting repeating + and - into one char: +-++=>-

	prepStr = prepStr.replace(/(?<!\d+),\d+/g, match => `0${match}`); // Adding zero to a ,123ish string: ,123 => 0,123

	prepStr = prepStr.replace(/[x×]/g, '*'); // Replace x and × with * so we can handle both symbols to trigger calc method

	prepStr = prepStr[0] === '+' ? prepStr.slice(1) : prepStr; // Cutting unnecessary + at the start

	return prepStr.replace(/,/g, '.');// Converting , into . coz our CalcModel works with . as decimal symbol
};

const prepareToScreen = (str:string) => str
	.replace(/\./g, ',') // Switching . back to the , since we are using , as onscreen decimal symbol
	.replace(/(?<!,(\d+)?)\d+/g, match => match.replace(/^0+/, '') || '0'); // To avoid unnecessary zeros at number start 00123=? 123

const calculate = (str:string, decimals:number):string => {
	try {
		const isBracketsCorrect = CalcModel.bracketsCheck(str);

		if (!isBracketsCorrect) {
			return SAMURAI_CALC_INVALID_INPUT;
		}

		const res = CalcModel.calculate(str);

		if (isNaN(res)) {
			return SAMURAI_CALC_INVALID_INPUT;
		}

		const fixedRes = res.toFixed(decimals);

		if (Number(fixedRes) === 0 && res !== 0) {// If fixed result equals 0, but actual dont
			return res.toExponential(decimals)	// Exponential form so we can handle low values
				.replace(/(?<=\.(\d+)?)0+(?=e)/g, '') // Cutting unnecessary zeroes before e: 1.1000e=>1.1e
				.replace(/\.(?=e)/g, ''); // Cutting unnecessary . before e: 1.e => 1e
		}

		return fixedRes
			.replace(/(?<=\.(\d+)?)0+$/g, '')// Cutting unnecessary zeroes after decimal point: 1.1000 => 1.1
			.replace(/\.$/g, ''); // Cutting unnecessary decimal point after zeroes cutting: 1. => 1
	} catch (e) {
		console.log(e);
		return SAMURAI_CALC_INVALID_INPUT;
	}
};

export const handleButtonClick = (val:string) => (dispatch: AppDispatch) => {
	const state = store.getState().samuraiCalc;

	if (val === '=') {
		const result = prepareToScreen(
			calculate(
				prepareToCalculate(state.screen), state.decimals),
		);
		dispatch(samuraiCalcSlice.actions.historyPush(state.screen));
		dispatch(samuraiCalcSlice.actions.setScreen(result));
		return;
	}

	if (val === 'C') {
		dispatch(samuraiCalcSlice.actions.setScreen('0'));
		return;
	}

	if (state.screen === SAMURAI_CALC_INVALID_INPUT) {
		dispatch(samuraiCalcSlice.actions.setScreen(String(val)));
		return;
	}

	const newScreenValue = prepareToScreen(state.screen + val);
	dispatch(samuraiCalcSlice.actions.setScreen(newScreenValue));
};

export const handleScreenInputChange = (val:string) => (dispatch: AppDispatch) => {
	console.log(val);


	dispatch(samuraiCalcSlice.actions.setScreen(val));
};
