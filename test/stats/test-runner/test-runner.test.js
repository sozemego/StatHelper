import {runTest} from '../../../src/stats/test-runner/test-runner';
import {CORRELATION} from '../../../src/experimental-design/model/test-constants';
import {CHI_SQUARE_INDEPENDENCE, PEARSON, SPEARMAN} from '../../../src/stats/test-runner/statistics';
import {NOMINAL, ORDINAL, RATIO} from '../../../src/scales/model/scale-constants';

const scales = [
  {
    name: 'Scale0',
    measurementLevel: RATIO,
    scores: [1, 2, 2, 3, 4, 5, 1, 2, 3, 4, 5, 4, 4, 4, 4, 5, 5, 5, 1, 1, 1, 2, 2, 2]
  },
  {name: 'Scale1', measurementLevel: ORDINAL, scores: [5, 2, 2, 1, 1, 1, 1, 12, 3, 4, 5]},
  {name: 'Scale2', measurementLevel: RATIO, scores: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5]},
  {name: 'Scale3', measurementLevel: RATIO, scores: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5]},
  {
    name: 'Scale4',
    measurementLevel: RATIO,
    scores: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 1, 1, 1, 2, 2, 2]
  },
  {name: 'Scale5', scores: []},
  {name: 'Scale6', measurementLevel: 'ast', scores: []},
  {name: 'Scale7', measurementLevel: NOMINAL, scores: [1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 5, 5, 5, 5]},
  {name: 'Scale8', measurementLevel: NOMINAL, scores: [2, 2, 1, 1, 1, 2, 3, 3, 3, 4, 5, 4, 4, 4]},
  {name: 'Scale8', measurementLevel: NOMINAL, scores: [1, 1, 1, 1, 1, 2, 3, 3, 3, 1, 1]}
];

describe('test runner', () => {
  it('should throw an exception for invalid test type', () => {
    const test = {type: 'cool test'};
    expect(() => runTest(test)).toThrow();
  });
  it('should throw an exception for less than two scales', () => {
    const test = {type: CORRELATION, name: 'Test', scales: []};
    expect(() => runTest(test)).toThrow();
  });
  it('should throw an exception for scale with invalid measurement level', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[5], scales[6]]};
    expect(() => runTest(test)).toThrow();
  });
  it('should throw an exception for scale with invalid measurement level', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[6], scales[7]]};
    expect(() => runTest(test)).toThrow();
  });
  it('should calculate pearson correlation test for two scales with normally distributed samples', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[2], scales[3]]};
    const result = runTest(test);
    expect(result.length).toBe(1);
    expect(result[0].testName).toBe(PEARSON);
  });
  it('should calculate spearman correlation test for two scales with non-normally distributed samples', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[0], scales[1]]};
    const result = runTest(test);
    expect(result.length).toBe(1);
    expect(result[0].testName).toBe(SPEARMAN);
  });
  it('should calculate spearman correlation for one scale with normal distribution and another with non-normal', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[0], scales[4]]};
    const result = runTest(test);
    expect(result.length).toBe(1);
    expect(result[0].testName).toBe(SPEARMAN);
  });
  it('should perform 3 tests for 3 scales, one for each scale pair', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[0], scales[1], scales[2]]};
    const result = runTest(test);
    expect(result.length).toBe(3);
  });
  it('should perform chi-square test for ordinal scales', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[7], scales[8]]};
    const result = runTest(test);
    expect(result[0].testName).toBe(CHI_SQUARE_INDEPENDENCE);
    expect(result.length).toBe(1);
  });
  it('should perform chi-square test for three ordinal scales', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[7], scales[8], scales[9]]};
    const result = runTest(test);
    expect(result[0].testName).toBe(CHI_SQUARE_INDEPENDENCE);
    expect(result.length).toBe(3);
  });
  it('should perform 3 correlations, two spearman-rho and one pearson for 3 scales (one of them being ordinal)', () => {
    const test = {type: CORRELATION, name: 'Test', scales: [scales[0], scales[3], scales[4]]};
    const result = runTest(test);
    expect(result[0].testName).toBe(PEARSON);
    expect(result[1].testName).toBe(SPEARMAN);
    expect(result[2].testName).toBe(SPEARMAN);
    expect(result.length).toBe(3);
  });
});