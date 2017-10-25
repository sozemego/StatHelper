import {makeActionCreator} from '../common/actions/utils';
import types from "./types";

const showChart = makeActionCreator(types.SHOW_CHART, 'chartType', 'data');
const hideChart = makeActionCreator(types.HIDE_CHART);

export default {
  showChart,
  hideChart
};