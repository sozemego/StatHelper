import {NOMINAL, ORDINAL, RATIO} from '../../scales/model/scale-constants';


/**
 * Returns descriptive statistics for a scale. The statistics depend on the
 * scale level of measurement.
 * For nominal scales, returns frequency of items in order and percentages for each answer.
 * For ordinal mode, median, frequency map and frequency percentages.
 * For ratio scales, returns mean, standard deviation, variance, distribution normality check.
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

	return {
		frequencies,
		sampleSize: result.length
	};
};

const ordinalScaleHandler = scale => {
	const {result} = scale;

	const frequencies = createFrequencyCount(result);
	console.log(frequencies);

	return {
		frequencies,
		sampleSize: result.length
	};
};

const ratioScaleHandler = scale => {

};

/**
 * Counts all occurrences of all values in an result array,
 * and for each occurrence, appends a
 * @param results
 */
const createFrequencyCount = results => {
	const map = {};

	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		if (!map[result]) {
			map[result] = 1;
		} else {
			map[result] = ++map[result];
		}
	}

	const frequencies = [];

	for (const key in map) {
		const descriptive = {
			count: map[key],
			value: Number.isNaN(key) ? key : parseFloat(key),
			percent: Number(((map[key] / results.length) * 100).toFixed(1))
		};
		frequencies.push(descriptive);
	}
	frequencies.sort((a, b) => b.count - a.count);
	return frequencies;
};

const scaleHandlers = {
	[NOMINAL]: nominalScaleHandler,
	[ORDINAL]: ordinalScaleHandler,
	[RATIO]: ratioScaleHandler
};