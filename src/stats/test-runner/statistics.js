import {Vector, Normality} from 'jerzy';
import {cumulativeStdNormalProbability, mean, sum} from 'simple-statistics';

/**
 * Checks whether a given array of numbers is a normal distribution.
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
 * @param result1
 * @param result2
 * @returns {{coefficient: number, pValue}}
 */
export const spearman = (result1, result2) => {

	result1 = rank(result1);
	result2 = rank(result2);

	const deviation1 = deviation(result1);
	const deviation2 = deviation(result2);

	const spearmanCoefficient = sum(deviation1.map((xi, i) => {
		return xi * deviation2[i];
	})) / Math.sqrt(sum(deviation1.map(xi => {
		return Math.pow(xi, 2);
	})) * sum(deviation2.map(yi => {
		return Math.pow(yi, 2);
	})));

	const pValue = spearmanSignificance(spearmanCoefficient, result1.length);

	return {
		coefficient: spearmanCoefficient,
		pValue
	};
};

/**
 * Computes and returns p-value for a given Spearman-rho coefficient and sample size.
 * @see    //https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient#Determining_significance
 * @param coefficient
 * @param sampleSize
 * @returns {number}
 */
const spearmanSignificance = (coefficient, sampleSize) => {

	const fisherTransformation = Math.atanh(Math.abs(coefficient));
	const z = fisherTransformation * Math.sqrt((sampleSize - 3) / 1.06);

	return 1 - cumulativeStdNormalProbability(z);
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
