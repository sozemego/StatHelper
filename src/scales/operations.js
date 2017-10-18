import {sortAsc} from '../common/utils';
import selectors from './selectors';
import {
  createNewScale,
  isMeasurementLevelValid
} from './model/scale';
import actions from './actions';

const getRoot = getState => selectors.scaleRootSelector(getState());

const createScale = scaleId => {
  return (dispatch, getState) => {
    checkScaleIdAlreadyExists(scaleId, getRoot(getState));
    const scale = createNewScale(scaleId);
    dispatch(actions.addScale(scale));
  };
};

const checkScaleIdAlreadyExists = (scaleId, state) => {
  if (!scaleId) return;
  const scale = selectors.getScaleById(state, scaleId);
  if (scale) {
    throw new Error(`Scale with id ${scaleId} already exists!`);
  }
};

const toggleItem = (scaleId, itemIndex) => {
  return (dispatch, getState) => {
    const scale = selectors.getScaleById(getRoot(getState), scaleId);
    if (!scale) {
      throw new Error(`Cannot toggle items of scale with id ${scaleId} because it does not exist.`);
    }
    const selectedItems = _toggleItem(itemIndex, selectors.getScaleItems(scale));
    dispatch(actions.selectItems(scaleId, sortAsc(selectedItems)));
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

const setScaleName = (scaleId, scaleName) => {
  return (dispatch, getState) => {
    validateScaleWithIdExists(scaleId, getRoot(getState));
    if (isScaleNameValid(scaleName)) {
      dispatch(actions.setScaleName(scaleId, scaleName));
    }
  };
};

const validateScaleWithIdExists = (scaleId, state) => {
  const scale = selectors.getScaleById(state, scaleId);
  if (!scale) throw Error(`Scale with id ${scaleId} does not exist!`);
};

const isScaleNameValid = scaleName => {
  return scaleName && scaleName.trim();
};

const removeScale = scaleId => {
  return (dispatch, getState) => {
    validateScaleWithIdExists(scaleId, getRoot(getState));
    dispatch(actions.selectScale(null));
    dispatch(actions.removeScale(scaleId));
  };
};

const setMeasurementLevel = (scaleId, measurementLevel) => {
  return (dispatch, getState) => {
    if (!isMeasurementLevelValid(measurementLevel)) {
      throw new Error(`${measurementLevel} is not a valid measurement level.`);
    }
    validateScaleWithIdExists(scaleId, getRoot(getState));
    dispatch(actions.setMeasurementLevel(scaleId, measurementLevel));

  };
};

const setScaleScores = (scaleId, scores) => {
  return (dispatch, getState) => {
    validateScaleWithIdExists(scaleId, getRoot(getState));
    dispatch(actions.setScaleScores(scaleId, scores));
  };
};


const selectScale = scaleId => actions.selectScale(scaleId);
const startSelectingItems = () => actions.startSelectingItems();

export default {
  createScale,
  toggleItem,
  setScaleName,
  removeScale,
  setMeasurementLevel,
  selectScale,
  startSelectingItems,
  setScaleScores
};