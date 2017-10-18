import uuid from 'uuid/v4';
import {MEASUREMENT_LEVELS} from './scale-constants';

let scalesCreated = 0;

export const createNewScale = id => {
  const scaleId = id || randomScaleId();
  const name = 'Scale ' + ++scalesCreated;
  const measurementLevel = MEASUREMENT_LEVELS[0];
  const items = [];
  const scores = [];

  return {
    scaleId,
    name,
    measurementLevel,
    items,
    scores
  };
};

export const randomScaleId = () => uuid();

export const isMeasurementLevelValid = measurementLevel => {
  return MEASUREMENT_LEVELS.findIndex(level => level === measurementLevel) > -1;
};