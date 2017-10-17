import {rootSelector} from '../common/selectors/selectors-utils';

const dataLoaderRootSelector = rootSelector('dataLoader');

const getData = state => state.data;
const getItemNames = state => state.itemNames;
const isLoading = state => state.loading;
const getError = state => state.error;

export default {
  dataLoaderRootSelector,
  getData,
  getItemNames,
  isLoading,
  getError
};