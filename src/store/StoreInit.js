import FileProcessingReducer from "../FileProcessing/reducer/FileProcessingReducer";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

export const store = createStore(
    FileProcessingReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);