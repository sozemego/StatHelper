import {MOUSE_UP} from '../../common/actions/common-actions';
import {ADD_SCALE, SELECT_ITEMS, SELECT_SCALE, SET_SCALES, START_SELECTING_ITEMS} from '../actions/scales-actions';

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
    default:
      return state;
  }
};

const selectItems = (scales, scaleIndex, selectedItems) => {
  const selectedScale = scales[scaleIndex];
  selectedScale.items = selectedItems;
  return scales.slice();
};

const addScale = (scale, scales) => {
  return scales.concat([scale]);
};

export default scales;