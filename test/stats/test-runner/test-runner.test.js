import {runTest} from '../../../src/stats/test-runner/test-runner';
import {CORRELATION} from '../../../src/experimental-design/model/test';

const scales = [
	{name: 'Scale1', result: [1, 2, 2, 3, 4, 5, 1, 2, 3, 4, 5, 4, 4, 4, 4, 5, 5, 5, 1, 1, 1, 2, 2, 2]},
	{name: 'Scale2', result: [5, 2, 2, 1, 1, 1, 1, 12, 3, 4, 5]},
	{name: 'Scale3', result: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5]},
	{name: 'Scale4', result: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5]}
];

describe('test runner', () => {
	it('should throw an exception for invalid test type', () => {
		const test = {type: 'cool test'};
		expect(() => runTest(test)).toThrow();
	});
	it('should throw an exception for less than two scales', () => {
		const test = {type: CORRELATION, name: 'Test', scales: [{}]};
		expect(() => runTest(test)).toThrow();
	});
	it('should calculate pearson correlation test for two scales with normally distributed samples', () => {
		const test = {type: CORRELATION, name: 'Test', scales: scales.slice().splice(2)};
		const result = runTest(test);
		expect(result.length).toBe(1);
		expect(result[0].testName).toBe('pearson');
	});
	it('should calculate spearman correlation test for two scales with non-normally distributed samples', () => {
		const test = {type: CORRELATION, name: 'Test', scales: scales.slice().splice(0, 2)};
		const result = runTest(test);
		expect(result.length).toBe(1);
		expect(result[0].testName).toBe('spearman');
	});
	it('should calculate spearman correlation for one scale with normal distribution and another with non-normal', () => {
		const test = {type: CORRELATION, name: 'Test', scales: [scales[0], scales[3]]};
		const result = runTest(test);
		expect(result.length).toBe(1);
		expect(result[0].testName).toBe('spearman');
	});
	it('should perform 3 tests for 3 scales, one for each scale pair', () => {
		const test = {type: CORRELATION, name: 'Test', scales: [scales[0], scales[1], scales[2]]};
		const result = runTest(test);
		expect(result.length).toBe(3);
	});
});