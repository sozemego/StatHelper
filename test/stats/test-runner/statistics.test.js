import {checkNormal, deviation, rank, sortNumbers, spearman} from '../../../src/stats/test-runner/statistics';

describe('sortNumbers', () => {
	it('should return a sorted array of numbers', () => {
		const arr = [3, 2, 1];
		const expected = [1, 2, 3];
		const sorted = sortNumbers(arr);
		expect(sorted).toEqual(expected);
	});
	it('should not modify the original array', () => {
		const arr = [3, 2, 1];
		sortNumbers(arr);
		expect(arr).toEqual([3, 2, 1]);
	});
});

describe('rank', () => {
	it('should correctly rank a sorted array of numbers', () => {
		const arr = [1, 2, 3, 4, 5];
		const expected = [1, 2, 3, 4, 5];
		const ranked = rank(arr);
		expect(ranked).toEqual(expected);
	});
	it('should correctly rank a sorted array of larger numbers', () => {
		const arr = [10, 20, 30, 40, 50];
		const expected = [1, 2, 3, 4, 5];
		const ranked = rank(arr);
		expect(ranked).toEqual(expected);
	});
	it('should correctly rank an unsorted array of numbers', () => {
		const arr = [10, 50, 15, 1, 2];
		const expected = [3, 5, 4, 1, 2];
		const ranked = rank(arr);
		expect(ranked).toEqual(expected);
	});
	it('should correctly rank an array with duplicates', () => {
		const arr = [10, 15, 15, 1, 1];
		const expected = [3, 4.5, 4.5, 1.5, 1.5];
		const ranked = rank(arr);
		expect(ranked).toEqual(expected);
	});
	it('should correctly rank an array with all same values', () => {
		const arr = [100, 100, 100, 100, 100];
		const expected = [3, 3, 3, 3, 3];
		const ranked = rank(arr);
		expect(ranked).toEqual(expected);
	});
});

describe('deviation', () => {
	it('should return a correct list of deviations from the mean', () => {
		const arr = [10, 20, 30, 40, 50];
		const expected = [-20, -10, 0, 10, 20];
		const deviations = deviation(arr);
		expect(deviations).toEqual(expected);
	});
});

const precisionForStatisticalTests = 2;

describe('spearman-rho statistic', () => {
	it('should give correct statistic for two identical samples', () => {
		const sample1 = [1, 2, 3, 4, 5];
		const sample2 = [1, 2, 3, 4, 5];

		const result = spearman(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
	});
	it('should give correct statistic for two negatively correlated samples', () => {
		const sample1 = [1, 2, 3, 4, 5];
		const sample2 = [5, 4, 3, 2, 1];
		const result = spearman(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(-1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
	});
});

describe('Normality test', () => {
	it('should return true for a normal distribution', () => {
		const array = [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5];
		const isNormal = checkNormal(array);
		expect(isNormal).toBe(true);
	});
	it('should return false for an uniform distribution', () => {
		const array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
		const isNormal = checkNormal(array);
		expect(isNormal).toBe(false);
	});
	it('should return false for bi-modal distribution', () => {
		const array = [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10];
		const isNormal = checkNormal(array);
		expect(isNormal).toBe(false);
	});
});

