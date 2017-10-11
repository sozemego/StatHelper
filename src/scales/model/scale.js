import uuid from 'uuid/v4';
import {MEASUREMENT_LEVELS} from './scale-constants';

let scalesCreated = 0;

export const createNewScale = () => {
  const id = uuid();
  const name = 'Scale' + ++scalesCreated;
  const measurementLevel = MEASUREMENT_LEVELS[0];
  const items = [];
  const results = [];
  return {
    id,
    name,
    measurementLevel,
    items,
    results
  };
};

export const isMeasurementLevelValid = measurementLevel => {
  return MEASUREMENT_LEVELS.findIndex(level => level === measurementLevel) > -1;
};