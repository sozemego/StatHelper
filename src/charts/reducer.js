import types from './types';

const initialState = {
  chartType: null,
  data: null,
  show: false
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_CHART:
      return {...state, chartType: action.chartType, data: [...action.data], show: true};
    case types.HIDE_CHART:
      return {...state, show: false};
    default:
      return state;
  }
};

export default chartReducer;