import CalcModel, {Calc} from '../../models/Calc.model';
import store from '../store';
import {SamuraiActionTypes} from './samuraiCalc.type';

export function setScreen(val:string) {
	return {
		type: SamuraiActionTypes.SET_SCREEN,
		payload: val,
	};
}

// Const calculateMethod = (str:string, methods:string[]) => {
// 	const number = str.match(MathMethod.numberRegExpStr);
// 	console.log('number');
// 	console.log(number);

// 	const opsRegExp = new RegExp(`[${methods.join('')}]`);
// 	const mathMethod = mathMethods[str.match(opsRegExp)[0]];
// 	const [a, b] = str.split(mathMethod.symbol);
// 	return mathMethod.fn(Number(a), Number(b));
// };

const calculate = (str:string) => {
	let calcStr = str.replace(/,/g, '.');
	const methods = [
		Array.from(CalcModel.methods.values()).filter(u => u.priority === 1).map(u => u.symbol),
	];

	methods.forEach(u => {
		console.log(u);
		let op = calcStr.match(new RegExp(`[${u.join('')}]`));
		console.log(op);
		while (op) {
			const method = CalcModel.methods.get(op[0]);
			if (method.fn.length === 2) {
				const a = calcStr.slice(0, op.index).match(new RegExp(`${Calc.numberRegExpStr}$`));
				const b = calcStr.slice(op.index + 1).match(new RegExp(`^${Calc.numberRegExpStr}`));
				const res = method.fn(Number(a[0]), Number(b[0]));
				calcStr = calcStr.slice(0, a.index) + res + calcStr.slice(op.index + 1 + b.index + b[0].length);
				op = calcStr.match(new RegExp(`[${u.join('')}]`));
			}
		}
	});
	console.log(calcStr);
	return calcStr;
};

export const handleButtonClick = (val:string|number) => {
	const state = store.getState().samuraiCalc;

	if (val === 'C') {
		return setScreen('0');
	}

	if (val === '=') {
		return setScreen(calculate(state.screen));
	}

	const newScreenValue = state.screen + val;
	return setScreen(newScreenValue);
};
