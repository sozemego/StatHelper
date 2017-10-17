import {makeActionCreator} from '../common/actions/utils';
import types from './types';

const loading = makeActionCreator(types.FILE_LOADING_START);
const itemNamesLoaded = makeActionCreator(types.ITEM_NAMES_LOADED, 'itemNames');
const dataLoaded = makeActionCreator(types.DATA_LOADED, 'data');
const loaded = makeActionCreator(types.FILE_LOADING_END);
const error = makeActionCreator(types.FILE_LOADING_ERROR, 'error');

export default {
  loading,
  itemNamesLoaded,
  dataLoaded,
  loaded,
  error,
};