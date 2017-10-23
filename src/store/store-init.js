import dataLoader from '../data-loader/reducer';
import scales from '../scales/reducer';
import experimentalDesign from '../experimental-design/reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import stats from '../stats/reducer';
import chart from '../charts/reducer/chart-reducer';

const rootReducer = combineReducers({
  dataLoader,
  scales,
  experimentalDesign,
  stats,
  chart
});

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);