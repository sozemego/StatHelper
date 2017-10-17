import {rootSelector} from '../common/selectors/selectors-utils';

export const dataLoaderRootSelector = rootSelector('dataLoader');

export const getData = state => state.data;
export const getItemNames = state => state.itemNames;
export const isLoading = state => state.loading;
export const getError = state => state.error;