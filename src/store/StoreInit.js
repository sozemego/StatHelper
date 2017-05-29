import reducer from "../reducers/reducers";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

export const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);