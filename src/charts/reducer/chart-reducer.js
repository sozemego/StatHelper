import {HIDE_CHART, SHOW_CHART} from '../actions/actions';

const initialState = {
  chartType: null,
  data: null,
  show: false
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CHART:
      return {...state, chartType: action.chartType, data: [...action.data], show: true};
    case HIDE_CHART:
      return {...state, show: false};
    default:
      return state;
  }
};

export default chartReducer;