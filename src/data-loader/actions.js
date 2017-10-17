import {makeActionCreator} from '../common/actions/utils';

export const FILE_LOADING_START = 'FILE_LOADING_START';
export const loading = makeActionCreator(FILE_LOADING_START);

export const ITEM_NAMES_LOADED = 'ITEM_NAMES_LOADED';
export const itemNamesLoaded = makeActionCreator(ITEM_NAMES_LOADED, 'itemNames');

export const DATA_LOADED = 'DATA_LOADED';
export const dataLoaded = makeActionCreator(DATA_LOADED, 'data');

export const FILE_LOADING_END = 'FILE_LOADING_END';
export const loaded = makeActionCreator(FILE_LOADING_END);

export const FILE_LOADING_ERROR = 'FILE_LOADING_ERROR';
export const error = makeActionCreator(FILE_LOADING_ERROR, 'error');

