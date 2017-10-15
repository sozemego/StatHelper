import {store} from '../../store/store-init';
import {createNewScale, isMeasurementLevelValid} from '../model/scale';
import {sortAsc} from '../../common/utils';
import {makeActionCreator} from '../../common/actions/utils';
import {
  getScaleById,
  getScaleId,
  getScaleItems,
  getScales,
  getSelectedScaleId,
  isSelectingItems,
  scaleRootSelector
} from '../selectors/scale-selectors';

export const START_SELECTING_ITEMS = 'START_SELECTING_ITEMS';
export const startSelectingItems = makeActionCreator(START_SELECTING_ITEMS);

export const SELECT_ITEMS = 'SELECT_ITEMS';
export const selectItems = makeActionCreator(SELECT_ITEMS, 'scaleId', 'selectedItems');

export const ADD_SCALE = 'ADD_SCALE';
export const addScale = makeActionCreator(ADD_SCALE, 'scale');

export const SELECT_SCALE = 'SELECT_SCALE';
export const selectScale = makeActionCreator(SELECT_SCALE, 'scaleId');

//used only for convenience
const getScalesState = () => scaleRootSelector(store.getState());

export const createScale = scaleId => {
  return (dispatch) => {
    checkScaleIdAlreadyExists(scaleId);
    const scale = createNewScale(scaleId);
    dispatch(addScale(scale));
    dispatch(selectScale(getScaleId(scale)));
  };
};

const checkScaleIdAlreadyExists = scaleId => {
  if (!scaleId) return;
  const scale = getScaleById(getScalesState(), scaleId);
  if (scale) {
    throw new Error(`Scale with id ${scaleId} already exists!`);
  }
};

export const toggleItem = itemIndex => {
  return (dispatch) => {
    const state = getScalesState();
    const selectedScaleId = getSelectedScaleId(state);
    if (isSelectingItems(state) && selectedScaleId !== null) {
      const selectedScale = getScaleById(state, selectedScaleId);
      const selectedItems = _toggleItem(itemIndex, getScaleItems(selectedScale));
      dispatch(selectItems(selectedScaleId, sortAsc(selectedItems)));
    }
  };
};

const _toggleItem = (itemIndex, selectedItems) => {
  const index = selectedItems.findIndex(item => item === itemIndex);

  const nextSelectedItems = [...selectedItems];
  if (index === -1) {
    nextSelectedItems.push(itemIndex);
  } else {
    nextSelectedItems.splice(index, 1);
  }

  return nextSelectedItems;
};

export const setScaleName = (scaleId, scaleName) => {
  return (dispatch, getState) => {
    validateScaleWithIdExists(scaleId);
    if (isScaleNameValid(scaleName)) {
      dispatch(_setScaleName(scaleId, scaleName));
    }
  };
};

const validateScaleWithIdExists = scaleId => {
  const scale = getScaleById(getScalesState(), scaleId);
  if (!scale) throw Error(`Scale with id ${scaleId} does not exist!`);
};

export const SET_SCALE_NAME = 'SET_SCALE_NAME';
const _setScaleName = makeActionCreator(SET_SCALE_NAME, 'scaleId', 'scaleName');

const isScaleNameValid = scaleName => {
  return scaleName || scaleName.trim();
};

export const removeScale = scaleId => {
  return (dispatch) => {
    dispatch(selectScale(null));
    dispatch(_removeScale(scaleId));
  };
};

export const REMOVE_SCALE = 'REMOVE_SCALE';
const _removeScale = makeActionCreator(REMOVE_SCALE, 'scaleId');

export const SET_MEASUREMENT_LEVEL = 'SET_MEASUREMENT_LEVEL';
const _setMeasurementLevel = makeActionCreator(SET_MEASUREMENT_LEVEL, 'scaleId', 'measurementLevel');

export const setMeasurementLevel = (scaleId, measurementLevel) => {
  return (dispatch) => {
    if (isMeasurementLevelValid(measurementLevel)) {
      dispatch(_setMeasurementLevel(scaleId, measurementLevel));
    }
  };
};

export const SET_SCALE_SCORES = 'SET_SCALE_SCORES';
export const setScaleScores = makeActionCreator(SET_SCALE_SCORES, 'scaleId', 'scores');