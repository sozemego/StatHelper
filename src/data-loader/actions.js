import {makeActionCreator} from '../common/actions/utils';

export const FILE_LOADING_START = 'FILE_LOADING_START';
export const loading = makeActionCreator(FILE_LOADING_START);

export const FILE_LOADING_END = 'FILE_LOADING_END';
export const loaded = makeActionCreator(FILE_LOADING_END, 'parsedFile');

export const FILE_LOADING_ERROR = 'FILE_LOADING_ERROR';
export const error = makeActionCreator(FILE_LOADING_ERROR, 'error');

