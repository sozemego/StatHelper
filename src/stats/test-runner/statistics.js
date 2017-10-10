import {Vector, Normality} from 'jerzy';
import {mean, sampleCorrelation, sum, min, max} from 'simple-statistics';
import {Studentt} from 'distributions';
import {cdf} from 'chi-squared';

export const PEARSON = 'PEARSON';
export const SPEARMAN = 'SPEARMAN';
export const CHI_SQUARE_INDEPENDENCE = 'CHI_SQUARE_INDEPENDENCE';
export const PHI = 'PHI';
export const CRAMERS_V = 'CRAMERS_V';

/**
 * Checks whether a given array of numbers follows a normal distribution.
 * It performs a Shapiro-Wilk test and returns true if p-values test is above 0.05,
 * otherwise returns false.
 * @param arr
 * @returns {boolean}
 */
export const checkNormal = arr => {
	const shapiroWilk = calculateShapiroWilk(arr);
	return shapiroWilk.p > 0.05;
};

export const calculateShapiroWilk = arr => {
	const vector = new Vector(arr);
	return Normality.shapiroWilk(vector);
};

// taken from https://github.com/agrueneberg/Spearson/
/**
 * Given two arrays of samples, returns a Spearman-rho coefficient of correlation
 * and its p-value.
 * @param sample1
 * @param sample2
 * @returns {{coefficient: number, pValue}}
 */
export const spearman = (sample1, sample2) => {
	handleUnevenSamples(sample1, sample2);
	removeMissingData(sample1, sample2);

	sample1 = rank(sample1);
	sample2 = rank(sample2);

	const deviation1 = deviation(sample1);
	const deviation2 = deviation(sample2);

	const spearmanCoefficient = sum(deviation1.map((xi, i) => {
		return xi * deviation2[i];
	})) / Math.sqrt(sum(deviation1.map(xi => {
		return Math.pow(xi, 2);
	})) * sum(deviation2.map(yi => {
		return Math.pow(yi, 2);
	})));

	const pValue = calculateCorrelationSignificance(spearmanCoefficient, sample1.length);

	return {
		coefficient: Number(spearmanCoefficient.toFixed(3)),
		pValue: Number(pValue.toFixed(3)),
		testName: SPEARMAN
	};
};

/**
 * Given an array of numbers, return an array of ranks.
 * @param values
 * @returns {Array}
 */
export const rank = values => {
	const sorted = sortNumbers(values);
	const ranks = new Array(values.length);
	for (let i = 0; i < values.length; i++) {
		let rank, first, last;
		// Handle tied ranks.
		first = sorted.indexOf(values[i]);
		last = sorted.lastIndexOf(values[i]);
		if (first === last) {
			rank = first;
		} else {
			rank = (first + last) / 2;
		}
		// Add 1 because ranks start with 1.
		ranks[i] = rank + 1;
	}
	return ranks;
};

export const pearson = (sample1, sample2) => {
	handleUnevenSamples(sample1, sample2);
	removeMissingData(sample1, sample2);

	const coefficient = sampleCorrelation(sample1, sample2);
	const significance = calculateCorrelationSignificance(coefficient, sample1.length);

	return {
		coefficient: Number(coefficient.toFixed(3)),
		pValue: Number(significance.toFixed(3)),
		testName: PEARSON
	};
};

const coefficientToTScore = (coefficient, sampleSize) => {
	const df = sampleSize - 2;
	const divisor = 1 - (coefficient * coefficient);
	const sqrt = Math.sqrt(df / divisor);
	return coefficient * sqrt;
};

const calculateCorrelationSignificance = (coefficient, sampleSize) => {
	coefficient = Number(coefficient.toFixed(6));
	if (Math.abs(coefficient) === 1) {
		return 0;
	}

	const t = coefficientToTScore(coefficient, sampleSize);
	// t = 5.893 with 5 or more degrees of freedom is a critical value for alpha = 0.999
	if (t > 5.893 && (sampleSize - 2) >= 5) return 0;

	const tDistribution = new Studentt(sampleSize - 2);
	const p = tDistribution.cdf(t) * 2;
	if (p > 1) {
		return 2 - p;
	}
	return p;
};

export const chiSquareIndependence = (sample1, sample2) => {
	handleUnevenSamples(sample1, sample2);
	removeMissingData(sample1, sample2);

	const sample1Uniques = getSet(sample1);
	const sample2Uniques = getSet(sample2);

	//find all possible combinations of sample values
	const crosstabs = {};
	for (let i = 0; i < sample1Uniques.length; i++) {
		for (let j = 0; j < sample2Uniques.length; j++) {
			crosstabs[sample1Uniques[i] + ':' + sample2Uniques[j]] = {
				observed: 0
			};
		}
	}

	// count occurrences for each possible combination
	for (let i = 0; i < sample1.length; i++) {
		const crosstabsValue = crosstabs[sample1[i] + ':' + sample2[i]];
		++crosstabsValue.observed;
	}

	const totals = {
		total: sample1.length,
		rows: {},
		columns: {}
	};
	//count row totals
	for (let i = 0; i < sample1Uniques.length; i++) {
		let sum = 0;
		for (const key in crosstabs) {
			const [row, column] = key.split(':');
			if (row == sample1Uniques[i]) {
				sum += crosstabs[key].observed;
			}
		}
		totals.rows[sample1Uniques[i]] = sum;
	}

	//count column totals
	for (let i = 0; i < sample2Uniques.length; i++) {
		let sum = 0;
		for (const key in crosstabs) {
			const [row, column] = key.split(':');
			if (column == sample2Uniques[i]) {
				sum += crosstabs[key].observed;
			}
		}
		totals.columns[sample2Uniques[i]] = sum;
	}

	//calculate expected values for each combination (RowTotal*ColTotal)/GridTotal
	for (const key in crosstabs) {
		const [row, column] = key.split(':');
		crosstabs[key].expected = (totals.rows[row] * totals.columns[column]) / totals.total;
	}

	let chiSquare = 0;
	for (const key in crosstabs) {
		const {observed, expected} = crosstabs[key];
		if (expected !== 0) {
			chiSquare += Math.pow(observed - expected, 2) / expected;
		}
	}

	let coefficientType;
	if (sample1Uniques.length === 2 && sample2Uniques.length === 2) {
		coefficientType = PHI;
	} else {
		coefficientType = CRAMERS_V;
	}

	let coefficient = NaN;
	if (coefficientType === PHI) {
		coefficient = Math.sqrt(chiSquare / totals.total);
	} else if (coefficientType === CRAMERS_V) {
		const df = Math.min(sample1Uniques.length - 1, sample2Uniques.length - 1);
		coefficient = Math.sqrt(chiSquare / (totals.total * df));
	}

	const df = (sample1Uniques.length - 1) * (sample2Uniques.length - 1);
	const pValue = 1 - cdf(chiSquare, df);

	return {
		chiSquare,
		coefficient,
		pValue,
		testName: CHI_SQUARE_INDEPENDENCE,
		coefficientType,
		crosstabs
	};
};

export const sortNumbers = arr => {
	const copy = arr.slice();
	copy.sort((a, b) => a - b);
	return copy;
};

/**
 * For each element of the array, returns a difference between value of the element
 * and array mean.
 * @param values
 * @returns {Array}
 */
export const deviation = values => {
	const meanValue = mean(values);
	const result = new Array(values.length);
	for (let i = 0; i < values.length; i++) {
		result[i] = values[i] - meanValue;
	}
	return result;
};

/**
 * This function will attempt to make each sample have the same length.
 * Shorter sample arrays will be filled with nulls.
 * @param samples
 */
export const handleUnevenSamples = (...samples) => {

	const smallestSample = smallestLength(samples);
	const largestSample = largestLength(samples);

	for (let i = smallestSample; i < largestSample; i++) {
		for (let j = 0; j < samples.length; j++) {
			const sample = samples[j];
			const value = sample[i];
			if (value === undefined) {
				sample.push(null);
			}
		}
	}
};

const smallestLength = arrays => {
	return sortNumbers(arrays.map(arr => arr.length))[0];
};

const largestLength = arrays => {
	return sortNumbers(arrays.map(arr => arr.length)).reverse()[0];
};

/**
 * Removes rows where any of the samples have undefined or null values.
 * Assumes samples of equal length, use handleUnevenSamples function first.
 * @param samples
 */
export const removeMissingData = (...samples) => {

	const sampleSize = samples[0].length;
	const indicesToRemove = [];

	for (let i = 0; i < sampleSize; i++) {
		let anySampleHasMissingValue = false;
		for (let j = 0; j < samples.length; j++) {
			const sample = samples[j];
			const value = sample[i];
			if (value === undefined || value === null) {
				anySampleHasMissingValue = true;
			}
		}
		if (anySampleHasMissingValue) {
			indicesToRemove.push(i);
		}
	}

	for (let i = indicesToRemove.length - 1; i >= 0; i--) {
		for (let j = 0; j < samples.length; j++) {
			samples[j].splice(indicesToRemove[i], 1);
		}
	}
};

export const minValue = arr => {
	return min(arr);
};

export const maxValue = arr => {
	return max(arr);
};

/**
 * Given an array, returns an array without duplicates, a set.
 * @param arr
 */
export const getSet = arr => {
	const set = new Set(arr);
	return [...set];
};