import {filterByChars, findLastOfChars} from '../utils/fn.util';
import MathMethod from './MathMethod.model';

export class Calc {
	name:string;
	methods: Map<string, MathMethod>;
	constructor(name:string, methods:Map<string, MathMethod>) {
		this.name = name;
		this.methods = methods;
	}

	static numberRegExpStr = '(-?\\d+(\\.\\d+)?e[+-]\\d+)|(-?\\d+(\\.\\d+)?)';

	static brackets = new Map([
		['(', ')'],
	]);

	public bracketsCheck(str:string):boolean {
		const openers = Array.from(Calc.brackets.keys());
		const enders = Array.from(Calc.brackets.values());

		let cleanStr = filterByChars(str, [...openers, ...enders]);

		let lastBracketOpener = findLastOfChars(cleanStr, openers);

		while (lastBracketOpener && cleanStr) {
			const nextBracket = cleanStr[lastBracketOpener.index + 1];
			if (nextBracket !== Calc.brackets.get(lastBracketOpener.symbol)) {
				return false;
			}

			const sliceStart = lastBracketOpener.index;
			const sliceEnd = sliceStart + 1;

			cleanStr = cleanStr.slice(0, sliceStart) + cleanStr.slice(sliceEnd + 1);
			lastBracketOpener = findLastOfChars(cleanStr, openers);
		}

		return !cleanStr;
	}

	public calculate(str:string):number {
		const openers = Array.from(Calc.brackets.keys());

		let calcStr = str;
		let lastBracketOpener = findLastOfChars(calcStr, openers);

		while (lastBracketOpener) {
			const startIndex = lastBracketOpener.index;
			const endIndex = calcStr.indexOf(Calc.brackets.get(lastBracketOpener.symbol), lastBracketOpener.index);

			const calcSubStr = calcStr.slice(startIndex + 1, endIndex);
			const res = this.calculateBrackets(calcSubStr);
			calcStr = calcStr.slice(0, startIndex) + res + calcStr.slice(endIndex + 1);
			lastBracketOpener = findLastOfChars(calcStr, openers);
		}

		return this.calculateBrackets(calcStr);
	}

	private calculateBrackets(str:string):number {
		const checkStrInsert = (leftPart:string, rightPart:string):boolean => {
			if (leftPart) {
				if (leftPart[leftPart.length - 1].match(/\d/)) {
					return false;
				}
			}

			if (rightPart) {
				if (rightPart[0].match(/\d/)) {
					return false;
				}
			}

			return true;
		};

		let calcStr = str;

		const calcMethodsArr = Array.from(this.methods.values());
		const prioritiesArr = calcMethodsArr.reduce((a, u) => {
			if (!a.includes(u.priority)) {
				a.push(u.priority);
			}

			return a;
		}, []).sort((a, b) => a > b ? -1 : 1);

		const methods = prioritiesArr.map(u => calcMethodsArr.filter(u2 => u2.priority === u));

		methods.map(u => u.map(u2 => u2.symbol)).forEach(u => {
			const opsRegExp = new RegExp(`(?<!e)[\\${u.join('\\')}]`);
			const offset = calcStr[0] === '-' ? 1 : 0;

			let op = calcStr.slice(offset).match(opsRegExp);

			while (op) {
				const method = this.methods.get(op[0]);
				if (method.fn.length === 1) {
					if (method.pos === 'pre') {
						const a = calcStr.slice(op.index + offset + 1).match(new RegExp(`^${Calc.numberRegExpStr}`));
						const res = method.fn(Number(a[0]));
						const leftPart = calcStr.slice(offset, op.index + offset);
						const rightPart = calcStr.slice(op.index + offset + 1 + a[0].length);

						const isCorrectInsert = checkStrInsert(leftPart, rightPart);

						if (!isCorrectInsert) {
							return null;
						}

						calcStr = leftPart + res + rightPart;
					} else {
						const a = calcStr.slice(0, op.index + offset).match(new RegExp(`${Calc.numberRegExpStr}$`));
						const res = method.fn(Number(a[0]));
						const leftPart = calcStr.slice(offset, a.index + offset);
						const rightPart = calcStr.slice(op.index + 1);

						const isCorrectInsert = checkStrInsert(leftPart, rightPart);

						if (!isCorrectInsert) {
							return null;
						}

						calcStr = leftPart + res + rightPart;
					}
				} else if (method.fn.length === 2) {
					const a = calcStr.slice(0, op.index + offset).match(new RegExp(`${Calc.numberRegExpStr}$`));
					const b = calcStr.slice(op.index + offset + 1).match(new RegExp(`^${Calc.numberRegExpStr}`));
					const res = method.fn(Number(a[0]), Number(b[0]));

					const leftPart = calcStr.slice(offset, a.index + offset);
					const rightPart = calcStr.slice(op.index + 1 + offset + b.index + b[0].length);

					const isCorrectInsert = checkStrInsert(leftPart, rightPart);

					if (!isCorrectInsert) {
						return null;
					}

					calcStr = leftPart + res + rightPart;
				}

				op = (calcStr[0] === '-' ? calcStr.slice(1) : calcStr).match(opsRegExp);
			}
		});
		return Number(calcStr);
	}
}

const calcName = 'Samurai';

const initialMethods = new Map([
	['+', new MathMethod('+', 1, (a, b) => a + b)],
	['-', new MathMethod('-', 1, (a, b) => a - b)],
	['x', new MathMethod('x', 2, (a, b) => a * b)],
	['/', new MathMethod('/', 2, (a, b) => a / b)],
	['%', new MathMethod('%', 3, a => a / 100, 'post')],
	['√', new MathMethod('√', 3, a => Math.sqrt(a))],
]);

export default new Calc(calcName, initialMethods);
