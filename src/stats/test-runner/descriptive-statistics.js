import {NOMINAL, ORDINAL, RATIO} from '../../scales/model/scale-constants';
import {mean, median, mode, standardDeviation} from 'simple-statistics';
import {calculateShapiroWilk, maxValue, minValue} from './statistics';

/**
 * Returns descriptive statistics for a scale. The statistics depend on the
 * scale level of measurement.
 * For nominal scales, returns frequency of items in order and percentages for each answer.
 * For ordinal mode, median, frequency map and frequency percentages.
 * For ratio scales, returns mean, median, standard deviation, variance, distribution normality check.
 * All scales get a measure of sample size.
 * @param scale
 */
export const getDescriptives = scale => {
	const handler = scaleHandlers[scale.measurementLevel];
	if (!handler) {
		throw new Error('Invalid scale type');
	}
	return handler(scale);
};

const nominalScaleHandler = scale => {
	const {result} = scale;

	const frequencies = createFrequencyCount(result);
	const modes = calculateModes(result);
	const median = calculateMedian(result);

	return {
		frequencies,
		sampleSize: result.length,
		modes,
		median
	};
};

const ordinalScaleHandler = scale => {
	const {result} = scale;

	const frequencies = createFrequencyCount(result);
	const modes = calculateModes(result);
	const median = calculateMedian(result);

	return {
		frequencies,
		sampleSize: result.length,
		modes,
		median
	};
};

const ratioScaleHandler = scale => {
	const {result} = scale;

	const mean = calculateMean(result);
	const median = calculateMedian(result);
	const standardDeviation = calculateStandardDeviation(result);
	const normality = calculateNormality(result);
	const min = calculateMin(result);
	const max = calculateMax(result);

	return {
		sampleSize: result.length,
		median,
		mean: Number(mean.toFixed(2)),
		standardDeviation: Number(standardDeviation.toFixed(2)),
		normality,
		min,
		max
	};
};

/**
 * Counts all occurrences of all values in an result array,
 * and for each occurrence, appends a
 * @param results
 */
const createFrequencyCount = results => {

	const frequencies = [];
	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		const index = frequencies.findIndex(frequency => frequency.value === result);

		if (index === -1) {
			const frequency = {
				count: 1,
				value: Number.isNaN(parseFloat(result)) ? result : parseFloat(result)
			};
			frequencies.push(frequency);
		} else {
			frequencies[index].count = ++frequencies[index].count;
		}
	}

	for (let i = 0; i < frequencies.length; i++) {
		const frequency = frequencies[i];
		frequency.percent = Number(((frequency.count / results.length) * 100).toFixed(1));
	}

	frequencies.sort((a, b) => b.count - a.count);
	return frequencies;
};

const calculateModes = results => {
	const firstMode = mode(results);
	const secondMode = mode(results.filter(result => result !== firstMode));

	const occurrencesOfFirstMode = results.filter(result => result === firstMode).length;
	const occurrencesOfSecondMode = results.filter(result => result === secondMode).length;
	if (occurrencesOfFirstMode === occurrencesOfSecondMode) {
		return [firstMode, secondMode]; //two-modal distribution
	}

	return [firstMode];
};

const calculateMedian = results => {
	return median(results);
};

const calculateMean = results => {
	return mean(results);
};

const calculateStandardDeviation = results => {
	return standardDeviation(results);
};

const calculateNormality = results => {
	const shapiroWilk = calculateShapiroWilk(results);
	return {
		test: 'Shapiro-Wilk',
		pValue: Number(shapiroWilk.p.toFixed(3))
	};
};

const calculateMin = result => {
	return minValue(result);
};

const calculateMax = result => {
	return maxValue(result);
};

const scaleHandlers = {
	[NOMINAL]: nominalScaleHandler,
	[ORDINAL]: ordinalScaleHandler,
	[RATIO]: ratioScaleHandler
};