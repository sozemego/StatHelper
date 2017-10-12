import {SHOW_CHART} from '../actions/actions';

const initialState = {
  scale: null
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CHART:
      return {...state, scale: action.scale};
    default:
      return state;
  }
};

export default chartReducer;