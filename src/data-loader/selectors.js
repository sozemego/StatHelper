import {rootSelector} from '../common/selectors/selectors-utils';

export const dataLoaderRootSelector = rootSelector('dataLoader');

export const getData = state => state.data.slice(1);
export const getItemNames = state => state.data[0];
export const isLoading = state => state.loading;
export const getError = state => state.error;