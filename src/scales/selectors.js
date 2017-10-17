import {rootSelector} from '../common/selectors/selectors-utils';

const scaleRootSelector = rootSelector('scales');

/**
 * Given the root state of the application, returns an array containing all scales
 * @param scalesRoot
 * @returns {Array}
 */
const getScales = scalesRoot => scalesRoot.scaleList;

const getScaleById = (state, scaleId) => {
  return getScales(state).find(scale => getScaleId(scale) === scaleId);
};

const getScaleIndexById = (state, scaleId) => {
  return getScales(state).findIndex(scale => getScaleId(scale) === scaleId);
};

const getSelectedScale = state => {
  const selectedScaleId = getSelectedScaleId(state);
  return getScaleById(state, selectedScaleId);
};

const isSelectingItems = state => state.selectingItems;
const getSelectedScaleId = state => state.selectedScale;

const getScaleItems = scale => scale.items;
const getScaleId = scale => scale.scaleId;
const getScaleScores = scale => scale.scores;
const getScaleMeasurementLevel = scale => scale.measurementLevel;
const getScaleName = scale => scale.name;

export default {
  scaleRootSelector,
  getScales,
  getScaleById,
  getScaleIndexById,
  getSelectedScale,
  isSelectingItems,
  getSelectedScaleId,
  getScaleItems,
  getScaleId,
  getScaleScores,
  getScaleMeasurementLevel,
  getScaleName
};