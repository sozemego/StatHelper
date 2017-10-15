import {MOUSE_UP} from '../../common/actions/common-actions';
import {
  ADD_SCALE, REMOVE_SCALE, SELECT_ITEMS, SELECT_SCALE, SET_MEASUREMENT_LEVEL, SET_SCALE_NAME, SET_SCALE_RESULTS,
  SET_SCALE_SCORES,
  SET_SCALES,
  START_SELECTING_ITEMS
} from '../actions/scales-actions';
import {getScaleById, getScaleIndexById, getScales} from '../selectors/scale-selectors';

const initialState = {
  scaleList: [],
  selectingItems: false,
  selectedScale: null
};

const scales = (state = initialState, action) => {
  switch (action.type) {
    case START_SELECTING_ITEMS:
      return {...state, selectingItems: true};
    case MOUSE_UP:
      return {...state, selectingItems: false};
    case SELECT_ITEMS:
      return {...state, scaleList: selectItems(state, action.scaleId, action.selectedItems)};
    case ADD_SCALE:
      return {...state, scaleList: [...state.scaleList, action.scale]};
    case SELECT_SCALE:
      return {...state, selectedScale: action.scaleId};
    case SET_SCALE_NAME:
      return {...state, scaleList: setScaleName(state, action.scaleId, action.scaleName)};
    case SET_MEASUREMENT_LEVEL:
      return {...state, scaleList: setMeasurementLevel(state, action.scaleId, action.measurementLevel)};
    case SET_SCALE_SCORES:
      return {...state, scaleList: setScores(state, action.scaleId, action.scores)};
    case REMOVE_SCALE:
      return {...state, scaleList: removeScale(state, action.scaleId)};
    default:
      return state;
  }
};

const setMeasurementLevel = (state, scaleId, measurementLevel) => {
  const scaleIndex = getScaleIndexById(state, scaleId);
  const scales = [...getScales(state)];
  scales[scaleIndex] = {...scales[scaleIndex], measurementLevel};
  return scales;
};

const selectItems = (state, scaleId, selectedItems) => {
  const scaleIndex = getScaleIndexById(state, scaleId);
  const scales = [...getScales(state)];
  scales[scaleIndex] = {...scales[scaleIndex], items: selectedItems};
  return scales;
};

const setScaleName = (state, scaleId, name) => {
  const scale = getScaleById(state, scaleId);
  const scaleIndex = getScaleIndexById(state, scaleId);
  const scales = [...getScales(state)];
  scales[scaleIndex] = {...scale, name};
  return scales;
};

const setScores = (state, scaleId, scores) => {
  const scale = getScaleById(state, scaleId);
  const scaleIndex = getScaleIndexById(state, scaleId);
  const scales = [...getScales(state)];
  scales[scaleIndex] = {...scale, scores};
  return scales;
};

const removeScale = (state, scaleId) => {
  const scaleIndex = getScaleIndexById(state, scaleId);
  if (scaleIndex === -1) {
    return getScales(state);
  }
  const scales = [...getScales(state)];
  scales.splice(scaleIndex, 1);
  return scales;
};

export default scales;