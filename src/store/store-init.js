import fileProcessingReducer from '../file-processing/reducer/file-processing-reducer';
import scalesReducer from '../scales/reducer/scales-reducer';
import experimentalDesignReducer from '../experimental-design/reducer/experimental-design-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import stats from '../stats/reducer/stats-reducer';

const rootReducer = combineReducers({
  fileProcessing: fileProcessingReducer,
  scales: scalesReducer,
  experimentalDesign: experimentalDesignReducer,
  stats
});

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);