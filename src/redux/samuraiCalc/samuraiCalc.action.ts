import {SAMURAI_CALC_INVALID_INPUT} from '../../consts/samuraiCalc.const';
import CalcModel from '../../models/Calc.model';
import {cutNumber} from '../../utils/fn.util';
import {AppDispatch} from '../store';
import samuraiCalcSlice from './SamuraiCalc.slice';

const prepareToCalculate = (str:string) => {
	let prepStr = str;

	prepStr = prepStr.replace(/=/g, ''); // To filter resolve symbol

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

		let resToCut;

		if (Number(fixedRes) === 0 && res !== 0) {// If fixed result equals 0, but actual dont (for -1 > res < 1 cases)
			resToCut = Number(res.toExponential());// Exponential form so we can handle low values
		} else {
			resToCut = Number(res);
		}

		return String(cutNumber(resToCut, decimals));
	} catch {
		return SAMURAI_CALC_INVALID_INPUT;
	}
};

export const inputUpdate = (val:string, decimals: number) => (dispatch: AppDispatch) => {
	if (val.includes('=')) {
		const preparedValue = prepareToCalculate(val);
		const result = prepareToScreen(calculate(preparedValue, decimals));
		const valToStore = val.replace(/=/g, '');
		dispatch(samuraiCalcSlice.actions.historyPush(valToStore));
		dispatch(samuraiCalcSlice.actions.setScreen(result));
		return;
	}

	if (val.includes('C')) {
		dispatch(samuraiCalcSlice.actions.setScreen('0'));
		return;
	}

	const valToShow = prepareToScreen(val);
	dispatch(samuraiCalcSlice.actions.setScreen(valToShow));
};

export const setScreenType = (isTouch: boolean) => (dispatch: AppDispatch) => {
	dispatch(samuraiCalcSlice.actions.setScreenType(isTouch));
};
