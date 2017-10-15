import {getScoresForScale} from '../../../src/stats/test-runner/scores-calculator';

const data = [
  ['age', 'gender', 'city'],
  [1, 2, 3],
  [5, 2, 3],
  [1, -5, 3],
  [1, 2, 16],
  [15, 1, 3],
];

describe('scores calculator', () => {
  it('should calculate correct scores', () => {
    const scale = {
      items: [0, 1, 2]
    };
    const scores = getScoresForScale(scale, data);
    expect(scores.length).toBe(5);
    expect(scores[0]).toBe(6);
    expect(scores[1]).toBe(10);
    expect(scores[2]).toBe(-1);
    expect(scores[3]).toBe(19);
    expect(scores[4]).toBe(19);
  });
  it('should calculate correct scores, v2', () => {
    const scale = {
      items: [0, 2]
    };
    const scores = getScoresForScale(scale, data);
    expect(scores.length).toBe(5);
    expect(scores[0]).toBe(4);
    expect(scores[1]).toBe(8);
    expect(scores[2]).toBe(4);
    expect(scores[3]).toBe(17);
    expect(scores[4]).toBe(18);
  });
  it('should throw error for negative item index', () => {
    const scale = {
      items: [-1]
    };
    expect(() => getScoresForScale(scale, data)).toThrow();
  });
  it('should throw error for too big item index', () => {
    const scale = {
      items: [4]
    };
    expect(() => getScoresForScale(scale, data)).toThrow();
  });
});