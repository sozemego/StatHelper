import {makeActionCreator} from '../common/actions/utils';
import types from './types';

const startSelectingItems = makeActionCreator(types.START_SELECTING_ITEMS);
const selectItems = makeActionCreator(types.SELECT_ITEMS, 'scaleId', 'selectedItems');
const addScale = makeActionCreator(types.ADD_SCALE, 'scale');
const selectScale = makeActionCreator(types.SELECT_SCALE, 'scaleId');
const setScaleName = makeActionCreator(types.SET_SCALE_NAME, 'scaleId', 'scaleName');
const removeScale = makeActionCreator(types.REMOVE_SCALE, 'scaleId');
const setMeasurementLevel = makeActionCreator(types.SET_MEASUREMENT_LEVEL, 'scaleId', 'measurementLevel');
const setScaleScores = makeActionCreator(types.SET_SCALE_SCORES, 'scaleId', 'scores');

export default {
  startSelectingItems,
  selectItems,
  addScale,
  selectScale,
  setScaleName,
  removeScale,
  setMeasurementLevel,
  setScaleScores
};
