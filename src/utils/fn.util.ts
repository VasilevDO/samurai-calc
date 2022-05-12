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
