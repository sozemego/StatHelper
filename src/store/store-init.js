import fileProcessingReducer from "../file-processing/reducer/file-processing-reducer";
import scalesReducer from "../scales/reducer/scales-reducer";
import experimentalDesignReducer from "../experimental-design/reducer/experimental-design-reducer";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const rootReducer = combineReducers({
    fileProcessing: fileProcessingReducer,
    scales: scalesReducer,
    experimentalDesign: experimentalDesignReducer
});

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);