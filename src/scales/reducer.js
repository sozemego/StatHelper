import {MOUSE_UP} from '../common/actions/common-actions';
import types from './types';
import selectors from './selectors';

const initialState = {
  scaleList: [],
  selectingItems: false,
  selectedScale: null
};

const scales = (state = initialState, action) => {
  switch (action.type) {
    case types.START_SELECTING_ITEMS:
      return {...state, selectingItems: true};
    case MOUSE_UP:
      return {...state, selectingItems: false};
    case types.SELECT_ITEMS:
      return {...state, scaleList: selectItems(state, action.scaleId, action.selectedItems)};
    case types.ADD_SCALE:
      return {...state, scaleList: [...state.scaleList, action.scale]};
    case types.SELECT_SCALE:
      return {...state, selectedScale: action.scaleId};
    case types.SET_SCALE_NAME:
      return {...state, scaleList: setScaleName(state, action.scaleId, action.scaleName)};
    case types.SET_MEASUREMENT_LEVEL:
      return {...state, scaleList: setMeasurementLevel(state, action.scaleId, action.measurementLevel)};
    case types.SET_SCALE_SCORES:
      return {...state, scaleList: setScores(state, action.scaleId, action.scores)};
    case types.REMOVE_SCALE:
      return {...state, scaleList: removeScale(state, action.scaleId)};
    default:
      return state;
  }
};

const setMeasurementLevel = (state, scaleId, measurementLevel) => {
  const scaleIndex = selectors.getScaleIndexById(state, scaleId);
  const scales = [...selectors.getScales(state)];
  scales[scaleIndex] = {...scales[scaleIndex], measurementLevel};
  return scales;
};

const selectItems = (state, scaleId, selectedItems) => {
  const scaleIndex = selectors.getScaleIndexById(state, scaleId);
  const scales = [...selectors.getScales(state)];
  scales[scaleIndex] = {...scales[scaleIndex], items: selectedItems};
  return scales;
};

const setScaleName = (state, scaleId, name) => {
  const scale = selectors.getScaleById(state, scaleId);
  const scaleIndex = selectors.getScaleIndexById(state, scaleId);
  const scales = [...selectors.getScales(state)];
  scales[scaleIndex] = {...scale, name};
  return scales;
};

const setScores = (state, scaleId, scores) => {
  const scale = selectors.getScaleById(state, scaleId);
  const scaleIndex = selectors.getScaleIndexById(state, scaleId);
  const scales = [...selectors.getScales(state)];
  scales[scaleIndex] = {...scale, scores};
  return scales;
};

const removeScale = (state, scaleId) => {
  const scaleIndex = selectors.getScaleIndexById(state, scaleId);
  if (scaleIndex === -1) {
    return selectors.getScales(state);
  }
  const scales = [...selectors.getScales(state)];
  scales.splice(scaleIndex, 1);
  return scales;
};

export default scales;