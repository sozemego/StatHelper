import {NOMINAL, ORDINAL} from '../../../src/scales/model/scale';
import {getDescriptives} from '../../../src/stats/test-runner/descriptive-statistics';

describe('descriptive statistics for nominal scale', () => {
	it('should return items by frequency, sorted', () => {
		const scale = {
			name: 'scale',
			measurementLevel: NOMINAL,
			result: ['cool', 'great', 'fine', 'amazing', 'cool', 'great', 'great', 'fine', 'amazing']
		};
		const descriptives = getDescriptives(scale);
		const {frequencyMap, sampleSize} = descriptives;
		expect(frequencyMap).toBeDefined();
		expect(frequencyMap.find(value => value === 'cool').count).toBe(2);
		expect(frequencyMap.find(value => value === 'great').count).toBe(3);
		expect(frequencyMap.find(value => value === 'amazing').count).toBe(2);
		expect(frequencyMap.find(value => value === 'fine').count).toBe(2);
		expect(sampleSize).toBe(9);
	});
	it('should return items by percentage, sorted', () => {
		const scale = {
			name: 'scale',
			measurementLevel: NOMINAL,
			result: ['cool', 'great', 'fine', 'amazing', 'cool', 'great', 'great', 'fine', 'amazing']
		};
		const descriptives = getDescriptives(scale);
		const {frequencyMap, sampleSize} = descriptives;
		expect(frequencyMap).toBeDefined();
		expect(frequencyMap.find(value => value === 'cool').percent).toBe(22.2);
		expect(frequencyMap.find(value => value === 'great').percent).toBe(33.3);
		expect(frequencyMap.find(value => value === 'amazing').percent).toBe(22.2);
		expect(frequencyMap.find(value => value === 'fine').percent).toBe(22.2);
		expect(sampleSize).toBe(9);
	});
});

describe('descriptive statistics for ordinal scale', () => {
	it('should return items by frequency, sorted', () => {
		const scale = {
			name: 'scale',
			measurementLevel: ORDINAL,
			result: [1, 2, 6, 4, 1, 2, 8, 12, 1]
		};
		const descriptives = getDescriptives(scale);
		const {frequencyMap, sampleSize} = descriptives;
		expect(frequencyMap).toBeDefined();
		expect(frequencyMap.find(value => value === 1).count).toBe(2);
		expect(frequencyMap.find(value => value === 2).count).toBe(2);
		expect(frequencyMap.find(value => value === 6).count).toBe(1);
		expect(frequencyMap.find(value => value === 8).count).toBe(1);
		expect(frequencyMap.find(value => value === 12).count).toBe(1);
		expect(frequencyMap.findIndex(value => value === 1)).toBe(0);
		expect(frequencyMap.findIndex(value => value === 2)).toBe(1);
		expect(frequencyMap.findIndex(value => value === 6)).toBe(2);
		expect(frequencyMap.findIndex(value => value === 8)).toBe(3);
		expect(frequencyMap.findIndex(value => value === 12)).toBe(4);
		expect(sampleSize).toBe(9);
	});
	it('should return items with percentage frequency, sorted', () => {
		const scale = {
			name: 'scale',
			measurementLevel: ORDINAL,
			result: [1, 2, 6, 4, 1, 2, 8, 12, 1, 1, 5, 5, 12]
		};
		const descriptives = getDescriptives(scale);
		const {frequencyMap, sampleSize} = descriptives;
		expect(frequencyMap).toBeDefined();
		expect(frequencyMap.find(value => value === 1).percent).toBe(30.8);
		expect(frequencyMap.find(value => value === 2).percent).toBe(15.4);
		expect(frequencyMap.find(value => value === 4).percent).toBe(7.7);
		expect(frequencyMap.find(value => value === 5).percent).toBe(15.4);
		expect(frequencyMap.find(value => value === 6).percent).toBe(7.7);
		expect(frequencyMap.find(value => value === 8).percent).toBe(7.7);
		expect(frequencyMap.find(value => value === 12).percent).toBe(15.4);
		expect(frequencyMap.findIndex(value => value === 1)).toBe(0);
		expect(frequencyMap.findIndex(value => value === 2)).toBe(1);
		expect(frequencyMap.findIndex(value => value === 5)).toBe(2);
		expect(frequencyMap.findIndex(value => value === 4)).toBe(3);
		expect(frequencyMap.findIndex(value => value === 6)).toBe(4);
		expect(frequencyMap.findIndex(value => value === 8)).toBe(4);
		expect(frequencyMap.findIndex(value => value === 12)).toBe(15.4);
		expect(sampleSize).toBe(13);
	});
	it('should return items by frequency, sorted, v2', () => {
		const scale = {
			name: 'scale',
			measurementLevel: ORDINAL,
			result: [1, 2, 6, 4, 1, 2, 8, 12, 1, 14, 14, 14, 12, 15, 1, 1, 1, 0, 2, 4, 4, 4, 4, 4, 0]
		};
		const descriptives = getDescriptives(scale);
		const {frequencyMap, sampleSize} = descriptives;
		expect(frequencyMap).toBeDefined();
		expect(frequencyMap.find(value => value === 0).count).toBe(2);
		expect(frequencyMap.find(value => value === 1).count).toBe(6);
		expect(frequencyMap.find(value => value === 12).count).toBe(2);
		expect(frequencyMap.find(value => value === 14).count).toBe(3);
		expect(frequencyMap.find(value => value === 15).count).toBe(1);
		expect(frequencyMap.find(value => value === 2).count).toBe(3);
		expect(frequencyMap.find(value => value === 4).count).toBe(6);
		expect(frequencyMap.find(value => value === 6).count).toBe(1);
		expect(frequencyMap.find(value => value === 8).count).toBe(1);
		expect(frequencyMap.findIndex(value => value === 1)).toBe(0);
		expect(frequencyMap.findIndex(value => value === 4)).toBe(1);
		expect(frequencyMap.findIndex(value => value === 14)).toBe(2);
		expect(frequencyMap.findIndex(value => value === 2)).toBe(3);
		expect(frequencyMap.findIndex(value => value === 0)).toBe(4);
		expect(frequencyMap.findIndex(value => value === 12)).toBe(5);
		expect(frequencyMap.findIndex(value => value === 15)).toBe(6);
		expect(frequencyMap.findIndex(value => value === 6)).toBe(7);
		expect(frequencyMap.findIndex(value => value === 8)).toBe(8);
		expect(sampleSize).toBe(9);
	});
	it('should return correct mode', () => {
		const scale = {
			name: 'scale',
			measurementLevel: ORDINAL,
			result: [1, 2, 6, 4, 1, 2, 8, 12, 1]
		};
		const descriptives = getDescriptives(scale);
		const {modes} = descriptives;
		expect(modes).toBeDefined();
		expect(modes.length).toBe(1);
		expect(modes[0]).toBe(1);
	});
	it('should return correct median', () => {
		const scale = {
			name: 'scale',
			measurementLevel: ORDINAL,
			result: [1, 2, 6, 4, 1, 2, 8, 12, 1]
		};
		const descriptives = getDescriptives(scale);
		const {median} = descriptives;
		expect(median).toBeDefined();
		expect(median).toBe(2);
	});
});