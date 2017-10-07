/**
 * Computes scores for a scale.
 * Data is assumed to have the first array reserved for headers (column names).
 * For now, a result is a simple sum of all items for each row (case).
 * @param scale
 * @param data
 * @returns {Array}
 */
export const getResultForScale = (scale, data) => {
	const {items} = scale;
	// validate items
	const maxItemIndex = data[0].length - 1;
	items.forEach(itemIndex => {
		if (itemIndex < 0 || itemIndex > maxItemIndex)
			throw new Error('Invalid item index, must be between 0 and ' + maxItemIndex);
	});

	// for each item, get actual values for each row
	const itemValues = items.map(itemIndex => {
		const values = [];
		for (let i = 1; i < data.length; i++) {
			const value = data[i][itemIndex];
			values.push(value);
		}
		return values;
	});

	// for each row, sum the values together. That is the result of the scale
	const results = [];
	for (let i = 0; i < data.length - 1; i++) {
		let sum = 0;
		for (let j = 0; j < itemValues.length; j++) {
			sum += parseInt(itemValues[j][i]);
		}
		results.push(sum);
	}
	return results;
};