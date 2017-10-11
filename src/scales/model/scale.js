import {MEASUREMENT_LEVELS} from './scale-constants';

let scalesCreated = 0;

export const createNewScale = () => {
  const name = 'Scale' + ++scalesCreated;
  const measurementLevel = MEASUREMENT_LEVELS[0];
  const items = [];
  return {
    name,
    measurementLevel,
    items
  };
};

export const isMeasurementLevelValid = measurementLevel => {
  return MEASUREMENT_LEVELS.find(level => level === measurementLevel);
};