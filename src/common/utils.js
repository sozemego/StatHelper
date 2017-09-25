export const sortAsc = (arr) => {
	if (!(arr instanceof Array)) {
		throw new Error('Sort only arrays.');
	}
	arr.sort((a, b) => a - b);
	return arr;
};