import fileProcessingReducer from "../FileProcessing/reducer/FileProcessingReducer";
import scalesReducer from "../Scales/reducer/ScalesReducer";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const rootReducer = combineReducers({
    fileProcessingReducer,
    scalesReducer
});

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);