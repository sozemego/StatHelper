import {checkNormal, deviation, pearson, rank, sortNumbers, spearman} from '../../../src/stats/test-runner/statistics';

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
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
	it('should give correct statistic for two negatively correlated samples', () => {
		const sample1 = [1, 2, 3, 4, 5];
		const sample2 = [5, 4, 3, 2, 1];
		const result = spearman(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(-1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
	it('should give correct statistic for two uncorrelated samples', () => {
		const sample1 = [1, 0, -1, 0];
		const sample2 = [0, 1, 0, -1];
		const result = spearman(sample1, sample2);
		expect(result.coefficient).toEqual(0);
		expect(result.pValue).toEqual(1);
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
	it('should give correct statistic for two correlated, uneven samples', () => {
		const sample1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
		const sample2 = [1, 2, 3, 4, 5];
		const result = spearman(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
	it('should give correct statistic for two correlated, uneven samples, v2', () => {
		const sample1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
		const sample2 = [1, null, 3, null, 5, null, 2, null, 4, null];
		const result = spearman(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
	it('should give correct statistic for larger samples', () => {
		const sample1 = [1, 2, 3, 4, 1, 5, 1, 56, 3, 6, 2, 4, 7, 2, 4, 7, 23, 4, 7, 2, 45, 7, 3, 4, 7, 3, 4, 2, 3, 6, 4, 3, 6, 4, 4, 6, 7, 3, 4, 7, 3, 4, 7, 7, 3, 4, 6, 7, 3, 7];
		const sample2 = [3, 4, 5, 2, 3, 5, 6, 2, 3, 6, 67, 2, 3, 56, 7, 3, 6, 6, 6, 3, 5, 6, 7, 8, 3, 8, 9, 5, 5, 5, 7, 8, 4, 5, 8, 4, 5, 6, 8, 5, 8, 8, 4, 5, 8, 8, 4, 5, 7, 8];
		const result = spearman(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(-0.223, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0.119, precisionForStatisticalTests);
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
	it('should give correct statistic for larger samples, v2', () => {
		const sample1 = [26, 25, 24, 25, 24, 52, 25, 25, 24, 24, 24, 17, 21, 56, 38, 48, 33, 24, 26, 24, 24, 25, 25, 27, 26, 20, 35, 66, 26, 25, 24, 25, 24, 52, 25, 25, 24, 24, 24, 17, 21, 56, 38, 48, 33, 24, 26, 24, 24, 25, 25, 27, 26, 20, 35, 64, 26, 25, 24, 25, 24, 52, 25, 25, 24, 24, 24, 17, 21, 55, 38, 48, 33, 24, 26, 24, 24, 25, 24, 27, 26, 20, 36, 65, 26, 25, 24, 25, 24, 52, 25, 25, 24, 24, 23, 17, 21, 56, 38, 48, 32, 25, 24, 24, 24, 25, 25, 26, 26, 19, 35, 66, 25, 24, 24, 24, 24, 52, 25, 25, 23, 24, 24, 17, 21, 56, 38, 48, 33, 24, 26, 24, 24, 25, 25, 26, 26, 19, 35, 66];
		const sample2 = [28, 32, 31, 31, 29, 59, 30, 30, 31, 31, 32, 25, 26, 63, 44, 53, 38, 30, 33, 32, 31, 30, 30, 33, 31, 27, 38, 70, 28, 32, 31, 31, 29, 59, 30, 30, 31, 31, 31, 25, 26, 63, 44, 53, 36, 29, 33, 33, 32, 30, 30, 33, 31, 27, 38, 70, 28, 32, 31, 31, 29, 59, 30, 30, 31, 31, 31, 25, 26, 63, 44, 53, 36, 29, 34, 32, 32, 30, 30, 33, 31, 27, 38, 70, 28, 32, 31, 31, 29, 59, 30, 30, 31, 31, 31, 25, 26, 63, 44, 53, 36, 29, 33, 33, 32, 30, 30, 33, 31, 27, 38, 70, 29, 32, 31, 31, 29, 59, 30, 30, 31, 31, 32, 25, 26, 63, 44, 53, 36, 29, 33, 33, 32, 30, 30, 33, 32, 27, 38, 70];
		const result = spearman(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(0.757, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
	it('should give correct statistic for larger samples, v3', () => {
		const sample1 = [41, 33, 38, 41, 30, 61, 35, 33, 32, 34, 37, 31, 24, 71, 45, 64, 41, 30, 41, 34, 37, 30, 41, 42, 35, 36, 43, 73, 41, 33, 38, 41, 30, 61, 35, 33, 32, 32, 37, 31, 24, 71, 45, 64, 41, 30, 41, 32, 37, 30, 41, 42, 35, 36, 40, 78, 41, 33, 38, 41, 38, 61, 35, 30, 32, 29, 37, 31, 24, 65, 45, 64, 41, 30, 41, 32, 37, 30, 27, 42, 35, 36, 45, 75, 41, 33, 38, 41, 30, 61, 35, 33, 32, 32, 29, 31, 24, 63, 45, 64, 35, 30, 27, 32, 37, 30, 30, 36, 35, 22, 43, 73, 30, 27, 38, 27, 30, 61, 35, 33, 26, 32, 37, 31, 24, 63, 45, 64, 41, 30, 41, 32, 37, 30, 41, 36, 35, 22, 43, 73];
		const sample2 = [8, 12, 11, 11, 7, 14, 8, 8, 12, 12, 13, 12, 7, 14, 12, 8, 9, 10, 13, 13, 12, 9, 8, 12, 9, 13, 5, 9, 8, 12, 11, 11, 7, 14, 8, 8, 12, 13, 13, 12, 7, 14, 12, 8, 7, 9, 13, 14, 13, 9, 8, 12, 9, 13, 5, 9, 8, 12, 11, 11, 7, 14, 8, 8, 13, 12, 13, 12, 7, 14, 12, 8, 7, 10, 13, 14, 12, 9, 8, 12, 9, 13, 5, 9, 8, 12, 11, 11, 7, 14, 8, 8, 12, 12, 13, 12, 7, 14, 12, 8, 7, 9, 13, 14, 13, 9, 8, 12, 9, 13, 5, 9, 9, 12, 11, 11, 7, 14, 8, 8, 12, 12, 14, 12, 7, 14, 12, 8, 7, 9, 13, 14, 13, 9, 8, 12, 10, 13, 5, 9];
		const result = spearman(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(0.096, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0.259, precisionForStatisticalTests);
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
});

describe('pearson correlation test', () => {
	it('should give correct statistic for two identical samples', () => {
		const sample1 = [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5];
		const sample2 = [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5];
		const result = pearson(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
	});
	it('should give correct statistic for two negatively correlated samples', () => {
		const sample1 = [5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1, 1];
		const sample2 = [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5];
		const result = pearson(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(-1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
	});
	it('should give correct statistic for two uncorrelated samples', () => {
		const sample1 = [1, 0, -1, 0];
		const sample2 = [0, 1, 0, -1];
		const result = pearson(sample1, sample2);
		expect(result.coefficient).toEqual(0);
		expect(result.pValue).toEqual(1);
	});
	it('should give correct statistic for two correlated, uneven samples', () => {
		const sample1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
		const sample2 = [1, 2, 3, 4, 5];
		const result = pearson(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
	});
	it('should give correct statistic for two correlated, uneven samples, v2', () => {
		const sample1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
		const sample2 = [1, null, 3, null, 5, null, 2, null, 4, null];
		const result = pearson(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(1, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
	});
	it('should give correct statistic for larger samples', () => {
		const sample1 = [1, 2, 3, 4, 1, 5, 1, 56, 3, 6, 2, 4, 7, 2, 4, 7, 23, 4, 7, 2, 45, 7, 3, 4, 7, 3, 4, 2, 3, 6, 4, 3, 6, 4, 4, 6, 7, 3, 4, 7, 3, 4, 7, 7, 3, 4, 6, 7, 3, 7];
		const sample2 = [3, 4, 5, 2, 3, 5, 6, 2, 3, 6, 67, 2, 3, 56, 7, 3, 6, 6, 6, 3, 5, 6, 7, 8, 3, 8, 9, 5, 5, 5, 7, 8, 4, 5, 8, 4, 5, 6, 8, 5, 8, 8, 4, 5, 8, 8, 4, 5, 7, 8];
		const result = pearson(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(-0.133, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0.358, precisionForStatisticalTests);
	});
	it('should give correct statistic for larger samples, v2', () => {
		const sample1 = [26, 25, 24, 25, 24, 52, 25, 25, 24, 24, 24, 17, 21, 56, 38, 48, 33, 24, 26, 24, 24, 25, 25, 27, 26, 20, 35, 66, 26, 25, 24, 25, 24, 52, 25, 25, 24, 24, 24, 17, 21, 56, 38, 48, 33, 24, 26, 24, 24, 25, 25, 27, 26, 20, 35, 64, 26, 25, 24, 25, 24, 52, 25, 25, 24, 24, 24, 17, 21, 55, 38, 48, 33, 24, 26, 24, 24, 25, 24, 27, 26, 20, 36, 65, 26, 25, 24, 25, 24, 52, 25, 25, 24, 24, 23, 17, 21, 56, 38, 48, 32, 25, 24, 24, 24, 25, 25, 26, 26, 19, 35, 66, 25, 24, 24, 24, 24, 52, 25, 25, 23, 24, 24, 17, 21, 56, 38, 48, 33, 24, 26, 24, 24, 25, 25, 26, 26, 19, 35, 66];
		const sample2 = [28, 32, 31, 31, 29, 59, 30, 30, 31, 31, 32, 25, 26, 63, 44, 53, 38, 30, 33, 32, 31, 30, 30, 33, 31, 27, 38, 70, 28, 32, 31, 31, 29, 59, 30, 30, 31, 31, 31, 25, 26, 63, 44, 53, 36, 29, 33, 33, 32, 30, 30, 33, 31, 27, 38, 70, 28, 32, 31, 31, 29, 59, 30, 30, 31, 31, 31, 25, 26, 63, 44, 53, 36, 29, 34, 32, 32, 30, 30, 33, 31, 27, 38, 70, 28, 32, 31, 31, 29, 59, 30, 30, 31, 31, 31, 25, 26, 63, 44, 53, 36, 29, 33, 33, 32, 30, 30, 33, 31, 27, 38, 70, 29, 32, 31, 31, 29, 59, 30, 30, 31, 31, 32, 25, 26, 63, 44, 53, 36, 29, 33, 33, 32, 30, 30, 33, 32, 27, 38, 70];
		const result = pearson(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(0.990, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0, precisionForStatisticalTests);
		expect(result.pValue).toBeLessThanOrEqual(1);
	});
	it('should give correct statistic for larger samples, v3', () => {
		const sample1 = [41, 33, 38, 41, 30, 61, 35, 33, 32, 34, 37, 31, 24, 71, 45, 64, 41, 30, 41, 34, 37, 30, 41, 42, 35, 36, 43, 73, 41, 33, 38, 41, 30, 61, 35, 33, 32, 32, 37, 31, 24, 71, 45, 64, 41, 30, 41, 32, 37, 30, 41, 42, 35, 36, 40, 78, 41, 33, 38, 41, 38, 61, 35, 30, 32, 29, 37, 31, 24, 65, 45, 64, 41, 30, 41, 32, 37, 30, 27, 42, 35, 36, 45, 75, 41, 33, 38, 41, 30, 61, 35, 33, 32, 32, 29, 31, 24, 63, 45, 64, 35, 30, 27, 32, 37, 30, 30, 36, 35, 22, 43, 73, 30, 27, 38, 27, 30, 61, 35, 33, 26, 32, 37, 31, 24, 63, 45, 64, 41, 30, 41, 32, 37, 30, 41, 36, 35, 22, 43, 73];
		const sample2 = [8, 12, 11, 11, 7, 14, 8, 8, 12, 12, 13, 12, 7, 14, 12, 8, 9, 10, 13, 13, 12, 9, 8, 12, 9, 13, 5, 9, 8, 12, 11, 11, 7, 14, 8, 8, 12, 13, 13, 12, 7, 14, 12, 8, 7, 9, 13, 14, 13, 9, 8, 12, 9, 13, 5, 9, 8, 12, 11, 11, 7, 14, 8, 8, 13, 12, 13, 12, 7, 14, 12, 8, 7, 10, 13, 14, 12, 9, 8, 12, 9, 13, 5, 9, 8, 12, 11, 11, 7, 14, 8, 8, 12, 12, 13, 12, 7, 14, 12, 8, 7, 9, 13, 14, 13, 9, 8, 12, 9, 13, 5, 9, 9, 12, 11, 11, 7, 14, 8, 8, 12, 12, 14, 12, 7, 14, 12, 8, 7, 9, 13, 14, 13, 9, 8, 12, 10, 13, 5, 9];
		const result = pearson(sample1, sample2);
		expect(result.coefficient).toBeCloseTo(0.088, precisionForStatisticalTests);
		expect(result.pValue).toBeCloseTo(0.304, precisionForStatisticalTests);
		expect(result.pValue).toBeLessThanOrEqual(1);
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

