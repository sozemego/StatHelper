import {CORRELATION} from '../../experimental-design/model/test-constants';
import {
  checkNormal,
  CHI_SQUARE_INDEPENDENCE,
  chiSquareIndependence,
  PEARSON,
  pearson,
  SPEARMAN,
  spearman,
} from './statistics';
import {isMeasurementLevelValid} from '../../scales/model/scale';
import {NOMINAL, RATIO} from '../../scales/model/scale-constants';
import scalesSelectors from '../../scales/selectors';

export const runTest = test => {
  const runner = testRunners[test.type];
  if (!runner) {
    throw new Error('Invalid test type! ' + test.type);
  }
  return runner(test);
};

/**
 * Runs a correlation test.
 * The type of correlation run depends on the scales' measurement levels.
 *
 * For two scales of measurement level RATIO, normality check is performed.
 * If both scales follow a normal distribution, Pearson correlation coefficient is calculated.
 * If any of them do not follow a normal distribution, Spearman-rho coefficient is calculated.
 * For ordinal scales, Spearman-rho coefficient is calculated.
 * For nominal scales, Chi-Square measure of independence is calculated.
 * When correlating a scale with mixed measurement levels, the following rules are applied:
 * If one of the scales is ordinal, Spearman-rho is calculated.
 * If one of the scales is nominal, Chi-Square measure of independence is calculated.
 * @param test
 * @returns {Array}
 */
const correlation = test => {
  const {scales} = test;

  validateScales(scales);
  const normalDistributionResults = calculateNormality(scales);
  const allPairs = getAllPairs(scales);
  return runCorrelations(allPairs, normalDistributionResults);
};

/**
 * Throws an error if there are fewer than 2 scales or if any of the scales have an invalid measurement level.
 * @param scales
 */
const validateScales = scales => {
  if (!scales || scales.length < 2) {
    throw new Error('You need to have at least two scales to run a correlation test.');
  }
  // validate if all scales have a measurement level and if it's valid
  for (const scale of scales) {
    const {measurementLevel} = scale;
    if (!measurementLevel || !isMeasurementLevelValid(measurementLevel)) {
      throw new Error('Invalid measurement level: ' + measurementLevel);
    }
  }
};

const calculateNormality = scales => {
  // first check normality of all ratio scales
  const normalDistributionResults = {};
  scales
    .filter(scale => scalesSelectors.getScaleMeasurementLevel(scale) === RATIO)
    .forEach(scale => {
      normalDistributionResults[scalesSelectors.getScaleName(scale)] = checkNormal(scalesSelectors.getScaleScores(scale));
    });
  return normalDistributionResults;
};

const getAllPairs = scales => {
  const pairs = [];
  for (let i = 0; i < scales.length; i++) {
    for (let j = i + 1; j < scales.length; j++) {
      pairs.push([scales[i], scales[j]]);
    }
  }
  return pairs;
};

const getCorrelationType = (scale1, scale2, normalDistributions) => {
  const firstScaleLevel = scalesSelectors.getScaleMeasurementLevel(scale1);
  const secondScaleLevel = scalesSelectors.getScaleMeasurementLevel(scale2);

  if (firstScaleLevel === RATIO && secondScaleLevel === RATIO) {
    const firstScaleNormal = normalDistributions[scalesSelectors.getScaleName(scale1)];
    const secondScaleNormal = normalDistributions[scalesSelectors.getScaleName(scale2)];
    return firstScaleNormal && secondScaleNormal ? PEARSON : SPEARMAN;
  }

  // this covers the case of any of the two being either ratio or ordinal
  if (firstScaleLevel !== NOMINAL && secondScaleLevel !== NOMINAL) {
    return SPEARMAN;
  }

  if (firstScaleLevel === NOMINAL || secondScaleLevel === NOMINAL) {
    return CHI_SQUARE_INDEPENDENCE;
  }
};

const runCorrelations = (allPairs, normalDistributionResults) => {
  const results = [];
  for (let i = 0; i < allPairs.length; i++) {
    const firstScale = allPairs[i][0];
    const secondScale = allPairs[i][1];

    const correlationType = getCorrelationType(firstScale, secondScale, normalDistributionResults);
    const correlationCalculator = correlationCalculators[correlationType];

    const result = correlationCalculator(scalesSelectors.getScaleScores(firstScale), scalesSelectors.getScaleScores(secondScale));
    result.scales = [firstScale, secondScale];
    results.push(result);
  }

  return results;
};

const correlationCalculators = {
  PEARSON: pearson,
  SPEARMAN: spearman,
  CHI_SQUARE_INDEPENDENCE: chiSquareIndependence
};

const testRunners = {
  [CORRELATION]: correlation
};

