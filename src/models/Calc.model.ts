import MathMethod from './MathMethod.model';

export class Calc {
	name:string;
	methods: Map<string, MathMethod>;
	constructor(name:string, methods:Map<string, MathMethod>) {
		this.name = name;
		this.methods = methods;
	}

	static numberRegExpStr = '[0-9]+(.[0-9]+)?';
}

const calcName = 'Samurai';

const initialMethods = new Map([
	['+', new MathMethod('+', 1, (a, b) => a + b)],
	['-', new MathMethod('-', 1, (a, b) => a - b)],
]);

export default new Calc(calcName, initialMethods);
