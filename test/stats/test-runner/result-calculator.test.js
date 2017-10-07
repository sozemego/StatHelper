import {getResultForScale} from '../../../src/stats/test-runner/result-calculator';

const data = [
	['age', 'gender', 'city'],
	[1, 2, 3],
	[5, 2, 3],
	[1, -5, 3],
	[1, 2, 16],
	[15, 1, 3],
];

describe('result calculator', () => {
	it('should calculate correct result', () => {
		const scale = {
			items: [0, 1, 2]
		};
		const result = getResultForScale(scale, data);
		expect(result.length).toBe(5);
		expect(result[0]).toBe(6);
		expect(result[1]).toBe(10);
		expect(result[2]).toBe(-1);
		expect(result[3]).toBe(19);
		expect(result[4]).toBe(19);
	});
	it('should calculate correct result, v2', () => {
		const scale = {
			items: [0, 2]
		};
		const result = getResultForScale(scale, data);
		expect(result.length).toBe(5);
		expect(result[0]).toBe(4);
		expect(result[1]).toBe(8);
		expect(result[2]).toBe(4);
		expect(result[3]).toBe(17);
		expect(result[4]).toBe(18);
	});
	it('should throw error for negative item index', () => {
		const scale = {
			items: [-1]
		};
		expect(() => getResultForScale(scale, data)).toThrow();
	});
	it('should throw error for too big item index', () => {
		const scale = {
			items: [4]
		};
		expect(() => getResultForScale(scale, data)).toThrow();
	});
});