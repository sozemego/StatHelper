export const sortAsc = (arr) => {
	if (!(arr instanceof Array)) {
		throw new Error('Sort only arrays.');
	}
	arr.sort((a, b) => a - b);
	return arr;
};

/**
 * Performs a deep copy of a json object.
 * Does not work for ANY java object, but works for simple objects
 * containing only arrays, strings, booleans, undefined, nulls, numbers.
 * @param obj
 */
export const copy = obj => {
	return JSON.parse(JSON.stringify(obj));
};