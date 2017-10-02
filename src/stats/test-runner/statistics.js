import {Vector, Normality} from 'jerzy';
import {cumulativeStdNormalProbability, mean, sampleCorrelation, standardNormalTable, sum} from 'simple-statistics';
import {Studentt} from 'distributions';

export const PEARSON = 'PEARSON';
export const SPEARMAN = 'SPEARMAN';

/**
 * Checks whether a given array of numbers follows a normal distribution.
 * It performs a Shapiro-Wilk test and returns true if p-values test is above 0.05,
 * otherwise returns false.
 * @param arr
 * @returns {boolean}
 */
export const checkNormal = arr => {
	const vector = new Vector(arr);
	const shapiroWilk = Normality.shapiroWilk(vector);
	return shapiroWilk.p > 0.05;
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
const removeMissingData = (...samples) => {

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