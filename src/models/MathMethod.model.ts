class MathMethod {
	readonly symbol:string;
	readonly priority: number;
	readonly fn : (a:number, b?:number)=>number;
	readonly pos? : 'pre' | 'post';

	constructor(symbol:string, priority:number, fn:(a:number, b?:number)=>number, pos?:'pre'|'post') {
		this.symbol = symbol;
		this.priority = priority;
		this.fn = fn;
		if (fn.length === 1) {
			this.pos = pos || 'pre';
		}
	}
}

export default MathMethod;
