import MathMethod from '../models/MathMethod.model';

interface MathMethodsI {
    [key:string]:MathMethod
}

const mathMethods:MathMethodsI = {
	'+': new MathMethod('+', 1, (a, b) => a + b),
	'-': new MathMethod('-', 1, (a, b) => a - b),
};

export default mathMethods;
