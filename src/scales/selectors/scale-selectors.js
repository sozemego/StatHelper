import {rootSelector} from '../../common/selectors/selectors-utils';

export const scaleRootSelector = rootSelector('scales');

/**
 * Given the root of scale state (scales reducer), returns list of scales.
 * @param scalesRoot
 * @returns {Array}
 */
export const getScales = scalesRoot => scalesRoot.scaleList;

export const getScaleById = (state, scaleId) => {
  return getScales(state).find(scale => getScaleId(scale) === scaleId);
};

export const getScaleIndexById = (state, scaleId) => {
  return getScales(state).findIndex(scale => getScaleId(scale) === scaleId);
};

export const getSelectedScale = state => {
  const selectedScaleId = getSelectedScaleId(state);
  return getScaleById(state, selectedScaleId);
};

export const isSelectingItems = state => state.selectingItems;
export const getSelectedScaleId = state => state.selectedScale;


export const getScaleItems = scale => scale.items;
export const getScaleId = scale => scale.scaleId;
export const getScaleScores = scale => scale.scores;
export const getScaleMeasurementLevel = scale => scale.measurementLevel;
export const getScaleName = scale => scale.name;