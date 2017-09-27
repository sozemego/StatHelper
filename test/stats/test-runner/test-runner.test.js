import {runTest} from '../../../src/stats/test-runner/test-runner';
import {CORRELATION} from '../../../src/experimental-design/model/test';

const data = [
	['Gender', 'Age', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
	[1, 25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[2, 18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[2, 17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[2, 18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const scales = [
	{name: 'Scale1', result: [1, 2, 2, 3, 4, 5, 1, 2, 3, 4, 5]},
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
	it('should calculate correlation tests for two scales with normally distributed samples', () => {
		const test = {type: CORRELATION, name: 'Test', scales: scales.slice().splice(2)};
		const result = runTest(test);
		expect(result.length).toBe(1);
		expect(result[0].testName).toBe('pearson');
	});
});