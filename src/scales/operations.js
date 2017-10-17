import {store} from '../store/store-init';
import {sortAsc} from '../common/utils';
import selectors from './selectors';
import {
  createNewScale,
  isMeasurementLevelValid
} from './model/scale';
import actions from './actions';

const getScalesState = () => selectors.scaleRootSelector(store.getState());

const createScale = scaleId => {
  return (dispatch) => {
    checkScaleIdAlreadyExists(scaleId);
    const scale = createNewScale(scaleId);
    dispatch(actions.addScale(scale));
    dispatch(actions.selectScale(selectors.getScaleId(scale)));
  };
};

const checkScaleIdAlreadyExists = scaleId => {
  if (!scaleId) return;
  const scale = selectors.getScaleById(getScalesState(), scaleId);
  if (scale) {
    throw new Error(`Scale with id ${scaleId} already exists!`);
  }
};

const toggleItem = itemIndex => {
  return (dispatch) => {
    const state = getScalesState();
    const selectedScaleId = selectors.getSelectedScaleId(state);
    if (selectors.isSelectingItems(state) && selectedScaleId !== null) {
      const selectedScale = selectors.getScaleById(state, selectedScaleId);
      const selectedItems = _toggleItem(itemIndex, selectors.getScaleItems(selectedScale));
      dispatch(actions.selectItems(selectedScaleId, sortAsc(selectedItems)));
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

const setScaleName = (scaleId, scaleName) => {
  return (dispatch, getState) => {
    validateScaleWithIdExists(scaleId);
    if (isScaleNameValid(scaleName)) {
      dispatch(actions.setScaleName(scaleId, scaleName));
    }
  };
};

const validateScaleWithIdExists = scaleId => {
  const scale = selectors.getScaleById(getScalesState(), scaleId);
  if (!scale) throw Error(`Scale with id ${scaleId} does not exist!`);
};

const isScaleNameValid = scaleName => {
  return scaleName || scaleName.trim();
};

const removeScale = scaleId => {
  return (dispatch) => {
    dispatch(actions.selectScale(null));
    dispatch(actions.removeScale(scaleId));
  };
};

const setMeasurementLevel = (scaleId, measurementLevel) => {
  return (dispatch) => {
    if (isMeasurementLevelValid(measurementLevel)) {
      dispatch(actions.setMeasurementLevel(scaleId, measurementLevel));
    }
  };
};

const selectScale = scaleId => actions.selectScale(scaleId);
const startSelectingItems = () => actions.startSelectingItems();
const setScaleScores = (scaleId, scores) => actions.setScaleScores(scaleId, scores);

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