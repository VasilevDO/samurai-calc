interface CharsFinder {
    symbol:string,
    index:number
}

export const findLastOfChars = (str:string, charsArr:string[]):CharsFinder|null => {
	const indexFromEnd = str.split('').reverse().findIndex(u => charsArr.includes(u));
	if (indexFromEnd === -1) {
		return null;
	}

	const index = str.length - 1 - indexFromEnd;

	return {
		symbol: str[index],
		index,
	};
};

export const filterByChars = (str:string, charsArr:string[]):string => str.split('').filter(u => charsArr.includes(u)).join('');

export const cutNumber = (number:number, decimals:number):number => {
	const cutBasicNumber = (basicNumber:number, decimals:number):number => {
		const res = basicNumber.toFixed(decimals).replace(/\.?0+(?=$)/, '');
		return Number(res);
	};

	const basicNumberType = 'basic';
	const exponentalNumberType = 'exponental';

	const numberType = String(number).includes('e')
		? exponentalNumberType
		: basicNumberType;

	if (numberType === basicNumberType) {
		return cutBasicNumber(number, decimals);
	}

	if (numberType === exponentalNumberType) {
		const [left, right] = String(number).split('e');
		const cutLeft = cutBasicNumber(Number(left), decimals);
		return Number(`${cutLeft}e${right}`);
	}
};
