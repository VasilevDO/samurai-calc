import * as utils from '../fn.util';

describe('findLastOfChars fn', () => {
	const str = 'qwertyqq';

	test('should return object with symbol and index if string contains char', () => {
		const charsToFind = ['q'];
		const expectedRes = {
			symbol: charsToFind[0],
			index: str.length - 1,
		};
		const res = utils.findLastOfChars(str, charsToFind);
		expect(res).toStrictEqual(expectedRes);
	});

	test('should return object with last matching symbol and its index in string ', () => {
		const charsToFind = ['t', 'y'];
		const expectedRes = {
			symbol: charsToFind[1],
			index: str.length - 3,
		};
		const res = utils.findLastOfChars(str, charsToFind);
		expect(res).toStrictEqual(expectedRes);
	});

	test('should return null if char is not found inside string', () => {
		const charsToFind = ['a'];
		const expectedRes:null = null;
		const res = utils.findLastOfChars(str, charsToFind);
		expect(res).toBe(expectedRes);
	});
});

describe('filterByChars fn', () => {
	const str = 'qwertyqq';

	test('should return string containing only expected chars', () => {
		const filterChars = ['q', 't'];
		const expectedRes = 'qtqq';
		const res = utils.filterByChars(str, filterChars);
		expect(res).toBe(expectedRes);
	});

	test('should return empty string if no chars matching', () => {
		const filterChars = ['a'];
		const expectedRes:string = '';
		const res = utils.filterByChars(str, filterChars);
		expect(res).toBe(expectedRes);
	});
});

describe('cutNumber fn', () => {
	const decimals = 4;

	test('should return correct number fixed to required decimals', () => {
		const number = 0.12345;
		const expectedRes = 0.1235;
		const res = utils.cutNumber(number, decimals);
		expect(res).toBe(expectedRes);
	});

	test('should return number in exponental form if its too little to fit required decimals', () => {
		const number = 0.0000000012345;
		const expectedRes = 1.2345e-9;
		const res = utils.cutNumber(number, decimals);
		expect(res).toBe(expectedRes);
	});
});
