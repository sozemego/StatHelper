import {NOMINAL, ORDINAL, RATIO} from '../../scales/model/scale-constants';
import {mean, median, mode, standardDeviation} from 'simple-statistics';
import {calculateShapiroWilk, maxValue, minValue} from './statistics';
import scalesSelectors from '../../scales/selectors';

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
  const handler = scaleHandlers[scalesSelectors.getScaleMeasurementLevel(scale)];
  if (!handler) {
    throw new Error(`Invalid scale measurement level ${scalesSelectors.getScaleMeasurementLevel(scale)}`);
  }
  return handler(scale);
};

const nominalScaleHandler = scale => {
  const scores = scalesSelectors.getScaleScores(scale);

  const frequencies = createFrequencyCount(scores);
  const modes = calculateModes(scores);

  return {
    frequencies,
    sampleSize: scores.length,
    modes
  };
};

const ordinalScaleHandler = scale => {
  const scores = scalesSelectors.getScaleScores(scale);

  const frequencies = createFrequencyCount(scores);
  const modes = calculateModes(scores);
  const median = calculateMedian(scores);

  return {
    frequencies,
    sampleSize: scores.length,
    modes,
    median
  };
};

const ratioScaleHandler = scale => {
  const scores = scalesSelectors.getScaleScores(scale);

  const mean = calculateMean(scores);
  const median = calculateMedian(scores);
  const standardDeviation = calculateStandardDeviation(scores);
  const normality = calculateNormality(scores);
  const min = calculateMin(scores);
  const max = calculateMax(scores);

  return {
    sampleSize: scores.length,
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
 * return a list of {value, count, percentage} objects.
 * @param scores
 */
export const createFrequencyCount = scores => {

  const frequencies = [];
  for (let i = 0; i < scores.length; i++) {
    const result = scores[i];
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
    frequency.percent = Number(((frequency.count / scores.length) * 100).toFixed(1));
  }

  frequencies.sort((a, b) => b.count - a.count);
  return frequencies;
};

const calculateModes = scores => {
  const firstMode = mode(scores);
  const secondMode = mode(scores.filter(result => result !== firstMode));

  const occurrencesOfFirstMode = scores.filter(result => result === firstMode).length;
  const occurrencesOfSecondMode = scores.filter(result => result === secondMode).length;
  if (occurrencesOfFirstMode === occurrencesOfSecondMode) {
    return [firstMode, secondMode]; //two-modal distribution
  }

  return [firstMode];
};

const calculateMedian = scores => {
  return median(scores);
};

const calculateMean = scores => {
  return mean(scores);
};

const calculateStandardDeviation = scores => {
  return standardDeviation(scores);
};

const calculateNormality = scores => {
  const shapiroWilk = calculateShapiroWilk(scores);
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