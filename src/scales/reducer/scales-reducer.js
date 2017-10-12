import {MOUSE_UP} from '../../common/actions/common-actions';
import {
  ADD_SCALE, SELECT_ITEMS, SELECT_SCALE, SET_SCALE_RESULTS, SET_SCALES,
  START_SELECTING_ITEMS
} from '../actions/scales-actions';

const initialState = {
  scales: [],
  selectingItems: false,
  selectedScale: -1
};

const scales = (state = initialState, action) => {
  switch (action.type) {
    case START_SELECTING_ITEMS:
      return {...state, selectingItems: true};
    case MOUSE_UP:
      return {...state, selectingItems: false};
    case SELECT_ITEMS:
      return {...state, scales: selectItems(state.scales, action.scaleIndex, action.selectedItems)};
    case ADD_SCALE:
      return {...state, scales: addScale(action.scale, state.scales)};
    case SELECT_SCALE:
      return {...state, selectedScale: action.scaleIndex};
    case SET_SCALES:
      return {...state, scales: action.scales};
    case SET_SCALE_RESULTS:
      return {...state, scales: setResults(state.scales, action.scaleId, action.results)};
    default:
      return state;
  }
};

const selectItems = (scales, scaleIndex, selectedItems) => {
  const selectedScale = scales[scaleIndex];
  selectedScale.items = selectedItems;
  return [...scales];
};

const addScale = (scale, scales) => {
  return scales.concat([scale]);
};

const setResults = (scales, scaleId, results) => {
  const scale = scales.find(scale => scale.id.toString() === scaleId.toString());
  scale.results = results;
  return [...scales];
};

export default scales;