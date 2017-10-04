import {getDescriptives} from '../../../src/stats/test-runner/descriptive-statistics';
import {NOMINAL} from '../../../src/scales/model/scale-constants';

describe('descriptive statistics for invalid scale', () => {
	it('should throw error for an unknown measurement level', () => {
		const scale = {
			name: 'scale',
			measurementLevel: 'level',
			result: ['a', 'b', 'c']
		};
		expect(() => getDescriptives(scale)).toThrow();
	});
});

describe('descriptive statistics for nominal scale', () => {
	it('should return items by frequency, sorted', () => {
		const scale = {
			name: 'scale',
			measurementLevel: NOMINAL,
			result: ['cool', 'great', 'fine', 'amazing', 'cool', 'great', 'great', 'fine', 'amazing']
		};
		const descriptives = getDescriptives(scale);
		const {frequencies, sampleSize} = descriptives;
		expect(frequencies).toBeDefined();
		expect(frequencies.find(element => element.value === 'cool').count).toBe(2);
		expect(frequencies.find(element => element.value === 'great').count).toBe(3);
		expect(frequencies.find(element => element.value === 'amazing').count).toBe(2);
		expect(frequencies.find(element => element.value === 'fine').count).toBe(2);
		expect(frequencies.findIndex(element => element.value === 'great')).toBe(0);
		expect(frequencies.findIndex(element => element.value === 'cool')).toBe(1);
		expect(frequencies.findIndex(element => element.value === 'fine')).toBe(2);
		expect(frequencies.findIndex(element => element.value === 'amazing')).toBe(3);
		expect(sampleSize).toBe(9);
	});
	it('should return items by percentage, sorted', () => {
		const scale = {
			name: 'scale',
			measurementLevel: NOMINAL,
			result: ['cool', 'great', 'fine', 'amazing', 'cool', 'great', 'great', 'fine', 'amazing']
		};
		const descriptives = getDescriptives(scale);
		const {frequencies, sampleSize} = descriptives;
		expect(frequencies).toBeDefined();
		expect(frequencies.find(element => element.value === 'cool').percent).toBe(22.2);
		expect(frequencies.find(element => element.value === 'great').percent).toBe(33.3);
		expect(frequencies.find(element => element.value === 'amazing').percent).toBe(22.2);
		expect(frequencies.find(element => element.value === 'fine').percent).toBe(22.2);
		expect(frequencies.findIndex(element => element.value === 'great')).toBe(0);
		expect(frequencies.findIndex(element => element.value === 'cool')).toBe(1);
		expect(frequencies.findIndex(element => element.value === 'fine')).toBe(2);
		expect(frequencies.findIndex(element => element.value === 'amazing')).toBe(3);
		expect(sampleSize).toBe(9);
	});
});

// describe('descriptive statistics for ordinal scale', () => {
// 	it('should return items by frequency, sorted', () => {
// 		const scale = {
// 			name: 'scale',
// 			measurementLevel: ORDINAL,
// 			result: [1, 2, 6, 4, 1, 2, 8, 12, 1]
// 		};
// 		const descriptives = getDescriptives(scale);
// 		const {frequencies, sampleSize} = descriptives;
// 		expect(frequencies).toBeDefined();
// 		expect(frequencies.find(element => element.value === 1).count).toBe(2);
// 		expect(frequencies.find(element => element.value === 2).count).toBe(2);
// 		expect(frequencies.find(element => element.value === 6).count).toBe(1);
// 		expect(frequencies.find(element => element.value === 8).count).toBe(1);
// 		expect(frequencies.find(element => element.value === 12).count).toBe(1);
// 		expect(frequencies.findIndex(element => element.value === 1)).toBe(0);
// 		expect(frequencies.findIndex(element => element.value === 2)).toBe(1);
// 		expect(frequencies.findIndex(element => element.value === 6)).toBe(2);
// 		expect(frequencies.findIndex(element => element.value === 8)).toBe(3);
// 		expect(frequencies.findIndex(element => element.value === 12)).toBe(4);
// 		expect(sampleSize).toBe(9);
// 	});
// 	it('should return items with percentage frequency, sorted', () => {
// 		const scale = {
// 			name: 'scale',
// 			measurementLevel: ORDINAL,
// 			result: [1, 2, 6, 4, 1, 2, 8, 12, 1, 1, 5, 5, 12]
// 		};
// 		const descriptives = getDescriptives(scale);
// 		const {frequencies, sampleSize} = descriptives;
// 		expect(frequencies).toBeDefined();
// 		expect(frequencies.find(element => element.value === 1).percent).toBe(30.8);
// 		expect(frequencies.find(element => element.value === 2).percent).toBe(15.4);
// 		expect(frequencies.find(element => element.value === 4).percent).toBe(7.7);
// 		expect(frequencies.find(element => element.value === 5).percent).toBe(15.4);
// 		expect(frequencies.find(element => element.value === 6).percent).toBe(7.7);
// 		expect(frequencies.find(element => element.value === 8).percent).toBe(7.7);
// 		expect(frequencies.find(element => element.value === 12).percent).toBe(15.4);
// 		expect(frequencies.findIndex(element => element.value === 1)).toBe(0);
// 		expect(frequencies.findIndex(element => element.value === 2)).toBe(1);
// 		expect(frequencies.findIndex(element => element.value === 12)).toBe(2);
// 		expect(frequencies.findIndex(element => element.value === 5)).toBe(3);
// 		expect(frequencies.findIndex(element => element.value === 4)).toBe(4);
// 		expect(frequencies.findIndex(element => element.value === 6)).toBe(5);
// 		expect(frequencies.findIndex(element => element.value === 8)).toBe(6);
// 		expect(sampleSize).toBe(13);
// 	});
// 	it('should return items by frequency, sorted, v2', () => {
// 		const scale = {
// 			name: 'scale',
// 			measurementLevel: ORDINAL,
// 			result: [1, 2, 6, 4, 1, 2, 8, 12, 1, 14, 14, 14, 12, 15, 1, 1, 1, 0, 2, 4, 4, 4, 4, 4, 0]
// 		};
// 		const descriptives = getDescriptives(scale);
// 		const {frequencies, sampleSize} = descriptives;
// 		expect(frequencies).toBeDefined();
// 		expect(frequencies.find(element => element.value === 0).count).toBe(2);
// 		expect(frequencies.find(element => element.value === 1).count).toBe(6);
// 		expect(frequencies.find(element => element.value === 12).count).toBe(2);
// 		expect(frequencies.find(element => element.value === 14).count).toBe(3);
// 		expect(frequencies.find(element => element.value === 15).count).toBe(1);
// 		expect(frequencies.find(element => element.value === 2).count).toBe(3);
// 		expect(frequencies.find(element => element.value === 4).count).toBe(6);
// 		expect(frequencies.find(element => element.value === 6).count).toBe(1);
// 		expect(frequencies.find(element => element.value === 8).count).toBe(1);
// 		expect(frequencies.findIndex(element => element.value === 1)).toBe(0);
// 		expect(frequencies.findIndex(element => element.value === 4)).toBe(1);
// 		expect(frequencies.findIndex(element => element.value === 14)).toBe(2);
// 		expect(frequencies.findIndex(element => element.value === 2)).toBe(3);
// 		expect(frequencies.findIndex(element => element.value === 0)).toBe(4);
// 		expect(frequencies.findIndex(element => element.value === 12)).toBe(5);
// 		expect(frequencies.findIndex(element => element.value === 15)).toBe(6);
// 		expect(frequencies.findIndex(element => element.value === 6)).toBe(7);
// 		expect(frequencies.findIndex(element => element.value === 8)).toBe(8);
// 		expect(sampleSize).toBe(9);
// 	});
// 	it('should return correct mode', () => {
// 		const scale = {
// 			name: 'scale',
// 			measurementLevel: ORDINAL,
// 			result: [1, 2, 6, 4, 1, 2, 8, 12, 1]
// 		};
// 		const descriptives = getDescriptives(scale);
// 		const {modes} = descriptives;
// 		expect(modes).toBeDefined();
// 		expect(modes.length).toBe(1);
// 		expect(modes[0]).toBe(1);
// 	});
// 	it('should return correct median', () => {
// 		const scale = {
// 			name: 'scale',
// 			measurementLevel: ORDINAL,
// 			result: [1, 2, 6, 4, 1, 2, 8, 12, 1]
// 		};
// 		const descriptives = getDescriptives(scale);
// 		const {median} = descriptives;
// 		expect(median).toBeDefined();
// 		expect(median).toBe(2);
// 	});
// });