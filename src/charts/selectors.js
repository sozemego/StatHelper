import {rootSelector} from '../common/selectors/selectors-utils';

const chartRootSelector = rootSelector('chart');

const showChart = state => state.show;
const getChartType = state => state.chartType;
const getData = state => state.data;


export default {
  chartRootSelector,
  showChart,
  getChartType,
  getData
};