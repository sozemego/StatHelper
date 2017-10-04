/**
 * Returns descriptive statistics for a scale. The statistics depend on the
 * scale level of measurement.
 * For nominal scales, returns frequency of items in order and percentages for each answer.
 * For ordinal mode, median, frequency map and frequency percentages.
 * For ratio scales, returns mean, standard deviation, variance, distribution normality check.
 * All scales get a measure of sample size.
 * @param scale
 */
import {NOMINAL, ORDINAL, RATIO} from '../../scales/model/scale';

export const getDescriptives = scale => {
	const handler = scaleHandlers[scale.measurementLevel];
	if (!handler) {
		throw new Error('Invalid scale type');
	}
	return handler(scale);
};

const nominalScaleHandler = scale => {
	const {result} = scale;
	const frequencies = [];
	for (let i = 0; i < result.length; i++) {
		frequencies.push({});
	}

	createFrequencyCount(result, frequencies);

	return {
		frequencies
	};
};

/**
 * Counts all occurences of all values in an result array,
 * and for each occurence, appends a
 * @param results
 * @param frequencyMap
 */
const createFrequencyCount = (results, frequencyMap) => {
	const map = {};

	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		if (!map[result]) {
			map[result] = 1;
		} else {
			map[result] = ++map[result];
		}
	}

	let i = 0;
	for (const key in map) {
		frequencyMap[i].count = map[key];
		frequencyMap[i].value = key;
		i++;
	}
	frequencyMap.sort((a, b) => b.count - a.count);
};

const ordinalScaleHandler = scale => {

};

const ratioScaleHandler = scale => {

};

const scaleHandlers = {
	[NOMINAL]: nominalScaleHandler,
	[ORDINAL]: ordinalScaleHandler,
	[RATIO]: ratioScaleHandler
};