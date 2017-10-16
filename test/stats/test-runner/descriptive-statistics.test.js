import {getDescriptives} from '../../../src/stats/test-runner/descriptive-statistics';
import {NOMINAL, ORDINAL, RATIO} from '../../../src/scales/model/scale-constants';

describe('descriptive statistics for invalid scale', () => {
  it('should throw error for an unknown measurement level', () => {
    const scale = {
      name: 'scale',
      measurementLevel: 'level',
      scores: ['a', 'b', 'c']
    };
    expect(() => getDescriptives(scale)).toThrow();
  });
});

describe('descriptive statistics for nominal scale', () => {
  it('should return items by frequency, sorted', () => {
    const scale = {
      name: 'scale',
      measurementLevel: NOMINAL,
      scores: ['cool', 'great', 'fine', 'amazing', 'cool', 'great', 'great', 'fine', 'amazing']
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
      scores: ['cool', 'great', 'fine', 'amazing', 'cool', 'great', 'great', 'fine', 'amazing']
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

describe('descriptive statistics for ordinal scale', () => {
  it('should return items by frequency, sorted', () => {
    const scale = {
      name: 'scale',
      measurementLevel: ORDINAL,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1]
    };
    const descriptives = getDescriptives(scale);
    const {frequencies, sampleSize} = descriptives;
    expect(frequencies).toBeDefined();
    expect(frequencies.find(element => element.value === 1).count).toBe(3);
    expect(frequencies.find(element => element.value === 2).count).toBe(2);
    expect(frequencies.find(element => element.value === 6).count).toBe(1);
    expect(frequencies.find(element => element.value === 4).count).toBe(1);
    expect(frequencies.find(element => element.value === 8).count).toBe(1);
    expect(frequencies.find(element => element.value === 12).count).toBe(1);
    expect(frequencies.findIndex(element => element.value === 1)).toBe(0);
    expect(frequencies.findIndex(element => element.value === 2)).toBe(1);
    expect(frequencies.findIndex(element => element.value === 6)).toBe(2);
    expect(frequencies.findIndex(element => element.value === 4)).toBe(3);
    expect(frequencies.findIndex(element => element.value === 8)).toBe(4);
    expect(frequencies.findIndex(element => element.value === 12)).toBe(5);
    expect(sampleSize).toBe(9);
  });
  it('should return items with percentage frequency, sorted', () => {
    const scale = {
      name: 'scale',
      measurementLevel: ORDINAL,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1, 1, 5, 5, 12]
    };
    const descriptives = getDescriptives(scale);
    const {frequencies, sampleSize} = descriptives;
    expect(frequencies).toBeDefined();
    expect(frequencies.find(element => element.value === 1).percent).toBe(30.8);
    expect(frequencies.find(element => element.value === 2).percent).toBe(15.4);
    expect(frequencies.find(element => element.value === 4).percent).toBe(7.7);
    expect(frequencies.find(element => element.value === 5).percent).toBe(15.4);
    expect(frequencies.find(element => element.value === 6).percent).toBe(7.7);
    expect(frequencies.find(element => element.value === 8).percent).toBe(7.7);
    expect(frequencies.find(element => element.value === 12).percent).toBe(15.4);
    expect(frequencies.findIndex(element => element.value === 1)).toBe(0);
    expect(frequencies.findIndex(element => element.value === 2)).toBe(1);
    expect(frequencies.findIndex(element => element.value === 12)).toBe(2);
    expect(frequencies.findIndex(element => element.value === 5)).toBe(3);
    expect(frequencies.findIndex(element => element.value === 6)).toBe(4);
    expect(frequencies.findIndex(element => element.value === 4)).toBe(5);
    expect(frequencies.findIndex(element => element.value === 8)).toBe(6);
    expect(sampleSize).toBe(13);
  });
  it('should return items by frequency, sorted, v2', () => {
    const scale = {
      name: 'scale',
      measurementLevel: ORDINAL,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1, 14, 14, 14, 12, 15, 1, 1, 1, 0, 2, 4, 4, 4, 4, 4, 0]
    };
    const descriptives = getDescriptives(scale);
    const {frequencies, sampleSize} = descriptives;
    expect(frequencies).toBeDefined();
    expect(frequencies.find(element => element.value === 0).count).toBe(2);
    expect(frequencies.find(element => element.value === 1).count).toBe(6);
    expect(frequencies.find(element => element.value === 12).count).toBe(2);
    expect(frequencies.find(element => element.value === 14).count).toBe(3);
    expect(frequencies.find(element => element.value === 15).count).toBe(1);
    expect(frequencies.find(element => element.value === 2).count).toBe(3);
    expect(frequencies.find(element => element.value === 4).count).toBe(6);
    expect(frequencies.find(element => element.value === 6).count).toBe(1);
    expect(frequencies.find(element => element.value === 8).count).toBe(1);
    expect(frequencies.findIndex(element => element.value === 1)).toBe(0);
    expect(frequencies.findIndex(element => element.value === 4)).toBe(1);
    expect(frequencies.findIndex(element => element.value === 2)).toBe(2);
    expect(frequencies.findIndex(element => element.value === 14)).toBe(3);
    expect(frequencies.findIndex(element => element.value === 12)).toBe(4);
    expect(frequencies.findIndex(element => element.value === 0)).toBe(5);
    expect(frequencies.findIndex(element => element.value === 6)).toBe(6);
    expect(frequencies.findIndex(element => element.value === 8)).toBe(7);
    expect(frequencies.findIndex(element => element.value === 15)).toBe(8);
    expect(sampleSize).toBe(25);
  });
  it('should return correct mode', () => {
    const scale = {
      name: 'scale',
      measurementLevel: ORDINAL,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1]
    };
    const descriptives = getDescriptives(scale);
    const {modes} = descriptives;
    expect(modes).toBeDefined();
    expect(modes.length).toBe(1);
    expect(modes[0]).toBe(1);
  });
  it('should return correct mode, two-modal distribution', () => {
    const scale = {
      name: 'scale',
      measurementLevel: ORDINAL,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1, 6, 12, 6]
    };
    const descriptives = getDescriptives(scale);
    const {modes} = descriptives;
    expect(modes).toBeDefined();
    expect(modes.length).toBe(2);
    expect(modes[0]).toBe(1);
    expect(modes[1]).toBe(6);
  });
  it('should return correct median', () => {
    const scale = {
      name: 'scale',
      measurementLevel: ORDINAL,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1]
    };
    const descriptives = getDescriptives(scale);
    const {median} = descriptives;
    expect(median).toBeDefined();
    expect(median).toBe(2);
  });
  it('should return correct median, v2', () => {
    const scale = {
      name: 'scale',
      measurementLevel: ORDINAL,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1, 5, 5, 5, 5, 5, 5, 5, 5, 25, 25, 25, 25, 123, 2, 2, 2, 2]
    };
    const descriptives = getDescriptives(scale);
    const {median} = descriptives;
    expect(median).toBeDefined();
    expect(median).toBe(5);
  });
});

describe('descriptive statistics for ratio scale', () => {
  it('should calculate correct mean', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1, 5, 5, 5, 5, 5, 5, 5, 5, 25, 25, 25, 25, 123, 2, 2, 2, 2]
    };
    const descriptives = getDescriptives(scale);
    const {mean} = descriptives;
    expect(mean).toBe(11.85);
  });
  it('should calculate correct mean, v2', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [5, 5, 123, 122, 4, 1, 4, 5, 5, 1, 2, 4, 1, -2, 4, -2, -2, -2, -100, 10]
    };
    const descriptives = getDescriptives(scale);
    const {mean} = descriptives;
    expect(mean).toBe(9.4);
  });
  it('should calculate correct median', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1, 5, 5, 5, 5, 5, 5, 5, 5, 25, 25, 25, 25, 123, 2, 2, 2, 2]
    };
    const descriptives = getDescriptives(scale);
    const {median} = descriptives;
    expect(median).toBe(5);
  });
  it('should calculate correct median, v2', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [5, 5, 123, 122, 4, 1, 4, 5, 5, 1, 2, 4, 1, -2, 4, -2, -2, -2, -100, 10]
    };
    const descriptives = getDescriptives(scale);
    const {median} = descriptives;
    expect(median).toBe(4);
  });
  it('should calculate correct standard deviation', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1, 5, 5, 5, 5, 5, 5, 5, 5, 25, 25, 25, 25, 123, 2, 2, 2, 2]
    };
    const descriptives = getDescriptives(scale);
    const {standardDeviation} = descriptives;
    expect(standardDeviation).toBe(23.59);
  });
  it('should calculate correct standard deviation, v2', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [5, 5, 123, 122, 4, 1, 4, 5, 5, 1, 2, 4, 1, -2, 4, -2, -2, -2, -100, 10]
    };
    const descriptives = getDescriptives(scale);
    const {standardDeviation} = descriptives;
    expect(standardDeviation).toBe(43.89);
  });
  it('should correctly determine distribution normality', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5]
    };
    const descriptives = getDescriptives(scale);
    const {normality} = descriptives;
    expect(normality.test).toBe('Shapiro-Wilk');
    expect(normality.pValue).toBeGreaterThan(0.05);
  });
  it('should correctly determine distribution normality, v2', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [5, 1, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 50, 50, 50, 50, 50]
    };
    const descriptives = getDescriptives(scale);
    const {normality} = descriptives;
    expect(normality.test).toBe('Shapiro-Wilk');
    expect(normality.pValue).toBeLessThan(0.05);
  });
  it('should return sample size', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [1, 2, 6, 4, 1, 2, 8, 12, 1, 5, 5, 5, 5, 5, 5, 5, 5, 25, 25, 25, 25, 123, 2, 2, 2, 2]
    };
    const descriptives = getDescriptives(scale);
    const {sampleSize} = descriptives;
    expect(sampleSize).toBe(26);
  });
  it('should return correct min and max values', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [5, 2, 12, 125, 1, 1, 1, 1, 5, 125]
    };
    const descriptives = getDescriptives(scale);
    const {min, max} = descriptives;
    expect(min).toBe(1);
    expect(max).toBe(125);
  });
  it('should return correct min and max values, v2', () => {
    const scale = {
      name: 'scale',
      measurementLevel: RATIO,
      scores: [-5, 2, 12, 125, 1, 1, 1, 1, 5, 12500, 65]
    };
    const descriptives = getDescriptives(scale);
    const {min, max} = descriptives;
    expect(min).toBe(-5);
    expect(max).toBe(12500);
  });
});