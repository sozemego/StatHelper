import scales from '../../src/scales/reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import operations from '../../src/scales/operations';
import selectors from '../../src/scales/selectors';
import {MEASUREMENT_LEVELS} from '../../src/scales/model/scale-constants';
import {mouseUp} from '../../src/common/actions/common-actions';

let store;
let getState;

const reducers = combineReducers({
  scales
});

beforeEach(() => {
  store = createStore(
    reducers,
    applyMiddleware(
      thunkMiddleware
    ));
  getState = () => selectors.scaleRootSelector(store.getState());
});

describe('scale operations', () => {

  describe('createScale operation', () => {
    it('should create a new scale', () => {
      store.dispatch(operations.createScale());
      const scales = selectors.getScales(getState());
      expect(scales.length).toBe(1);
      expect(selectors.getScaleId(scales[0])).toBeDefined();
    });

    it('should create two scales after being called twice', () => {
      store.dispatch(operations.createScale());
      store.dispatch(operations.createScale());
      const scales = selectors.getScales(getState());
      expect(scales.length).toBe(2);
      expect(selectors.getScaleId(scales[0])).toBeDefined();
      expect(selectors.getScaleId(scales[1])).toBeDefined();
    });

    it('should create scale with given id', () => {
      store.dispatch(operations.createScale(1));
      store.dispatch(operations.createScale('abc'));
      const scales = selectors.getScales(getState());
      expect(scales.length).toBe(2);
      expect(selectors.getScaleId(scales[0])).toBe(1);
      expect(selectors.getScaleId(scales[1])).toBe('abc');
    });

    it('should not automatically select the created scale', () => {
      store.dispatch(operations.createScale(1));
      const scales = selectors.getScales(getState());
      expect(scales.length).toBe(1);
      expect(selectors.getSelectedScale(getState())).toBeUndefined();
    });

    it('should throw error if attempting to create scale with already existing scale id', () => {
      store.dispatch(operations.createScale(1));
      expect(() => store.dispatch(operations.createScale(1))).toThrow();
    });
  });

  describe('select scale', () => {

    const scaleId = 1;
    beforeEach(() => {
      store.dispatch(operations.createScale(scaleId));
    });

    it('should not fail for non-existent scale', () => {
      store.dispatch(operations.selectScale('abc'));
      expect(selectors.getSelectedScaleId(getState())).toBe('abc');
      expect(selectors.getSelectedScale(getState())).toBe(undefined);
    });

    it('should correctly select a scale', () => {
      store.dispatch(operations.selectScale(scaleId));
      expect(selectors.getSelectedScaleId(getState())).toBe(scaleId);
      expect(selectors.getSelectedScale(getState())).toBeDefined();
    });

    it('should correctly select a scale among many', () => {
      const scaleIdToCheck = 1000;
      for (let i = 900; i < 1500; i++) {
        store.dispatch(operations.createScale(i));
      }
      store.dispatch(operations.selectScale(scaleIdToCheck));
      expect(selectors.getSelectedScaleId(getState())).toBe(scaleIdToCheck);
      expect(selectors.getSelectedScale(getState())).toBeDefined();
    });
  });

  describe('toggle item', () => {

    const scaleId = 1;
    beforeEach(() => {
      store.dispatch(operations.createScale(scaleId));
    });

    it('should correctly select all given items', () => {
      store.dispatch(operations.startSelectingItems());
      store.dispatch(operations.toggleItem(scaleId, 0));
      store.dispatch(operations.toggleItem(scaleId, 1));
      store.dispatch(operations.toggleItem(scaleId, 2));
      store.dispatch(operations.toggleItem(scaleId, 3));
      store.dispatch(operations.toggleItem(scaleId, 4));
      store.dispatch(operations.toggleItem(scaleId, 5));
      const scale = selectors.getScaleById(getState(), scaleId);
      expect(selectors.getScaleItems(scale).length).toBe(6);
      expect(selectors.getScaleItems(scale)[0]).toBe(0);
      expect(selectors.getScaleItems(scale)[1]).toBe(1);
      expect(selectors.getScaleItems(scale)[2]).toBe(2);
      expect(selectors.getScaleItems(scale)[3]).toBe(3);
      expect(selectors.getScaleItems(scale)[4]).toBe(4);
      expect(selectors.getScaleItems(scale)[5]).toBe(5);
    });

    it('should correctly toggle and untoggle items', () => {
      //toggle
      store.dispatch(operations.startSelectingItems());
      store.dispatch(operations.toggleItem(scaleId, 0));
      store.dispatch(operations.toggleItem(scaleId, 1));
      store.dispatch(operations.toggleItem(scaleId, 2));
      store.dispatch(operations.toggleItem(scaleId, 3));
      store.dispatch(operations.toggleItem(scaleId, 4));
      store.dispatch(operations.toggleItem(scaleId, 5));
      //untoggle
      store.dispatch(operations.toggleItem(scaleId, 3));
      store.dispatch(operations.toggleItem(scaleId, 4));
      store.dispatch(operations.toggleItem(scaleId, 5));
      const scale = selectors.getScaleById(getState(), scaleId);
      expect(selectors.getScaleItems(scale).length).toBe(3);
      expect(selectors.getScaleItems(scale)[0]).toBe(0);
      expect(selectors.getScaleItems(scale)[1]).toBe(1);
      expect(selectors.getScaleItems(scale)[2]).toBe(2);
    });

    it('should throw error for non-existing scale', () => {
      store.dispatch(operations.startSelectingItems());
      expect(() => store.dispatch(operations.toggleItem(-5000, 0))).toThrow();
    });
  });

  describe('set scale name', () => {

    const scaleId = 1;
    beforeEach(() => {
      store.dispatch(operations.createScale(scaleId));
    });

    it('should correctly change scale name', () => {
      const changeTo = Math.random() + '';
      expect(selectors.getScaleName(selectors.getScaleById(getState(), scaleId))).not.toBe(changeTo);
      store.dispatch(operations.setScaleName(scaleId, changeTo));
      expect(selectors.getScaleName(selectors.getScaleById(getState(), scaleId))).toBe(changeTo);
    });

    it('should throw error for non-existing scale', () => {
      expect(() => store.dispatch(operations.setScaleName(-9999, 'NEW_NAME'))).toThrow();
    });

    it('should fail to change name for null or undefined name', () => {
      store.dispatch(operations.setScaleName(scaleId, null));
      expect(selectors.getScaleName(selectors.getScaleById(getState(), scaleId))).not.toBe(null);
    });

    it('should fail to change name for all whitespace name', () => {
      store.dispatch(operations.setScaleName(scaleId, '    '));
      expect(selectors.getScaleName(selectors.getScaleById(getState(), scaleId))).not.toBe('    ');
    });
  });

  describe('remove scale', () => {

    const scaleId = 1;
    beforeEach(() => {
      store.dispatch(operations.createScale(scaleId));
    });

    it('should remove a scale', () => {
      let scales = selectors.getScales(getState());
      expect(scales.length).toBe(1);
      store.dispatch(operations.removeScale(scaleId));
      scales = selectors.getScales(getState());
      expect(scales.length).toBe(0);
    });

    it('should remove a scale from many', () => {
      store.dispatch(operations.createScale(2));
      store.dispatch(operations.createScale(3));

      let scales = selectors.getScales(getState());
      expect(scales.length).toBe(3);
      store.dispatch(operations.removeScale(scaleId));
      scales = selectors.getScales(getState());
      expect(scales.length).toBe(2);
    });

    it('should throw error for non-existent scale', () => {
      expect(() => store.dispatch(operations.removeScale('ABC'))).toThrow();
    });
  });

  describe('set measurement level', () => {

    const scaleId = 1;
    beforeEach(() => {
      store.dispatch(operations.createScale(scaleId));
    });

    it('should correctly set a measurement level', () => {
      store.dispatch(operations.setMeasurementLevel(scaleId, MEASUREMENT_LEVELS[0]));
      const scale = selectors.getScaleById(getState(), scaleId);
      expect(selectors.getScaleMeasurementLevel(scale)).toBe(MEASUREMENT_LEVELS[0]);
    });

    it('should correctly set a measurement level 2', () => {
      store.dispatch(operations.setMeasurementLevel(scaleId, MEASUREMENT_LEVELS[1]));
      const scale = selectors.getScaleById(getState(), scaleId);
      expect(selectors.getScaleMeasurementLevel(scale)).toBe(MEASUREMENT_LEVELS[1]);
    });

    it('should correctly set a measurement level 3', () => {
      store.dispatch(operations.setMeasurementLevel(scaleId, MEASUREMENT_LEVELS[2]));
      const scale = selectors.getScaleById(getState(), scaleId);
      expect(selectors.getScaleMeasurementLevel(scale)).toBe(MEASUREMENT_LEVELS[2]);
    });

    it('should throw error for non-existent scale id', () => {
      expect(() => store.dispatch(operations.setMeasurementLevel(-90101, MEASUREMENT_LEVELS[2]))).toThrow();
    });

    it('should throw error for invalid measurement level', () => {
      expect(() => store.dispatch(operations.setMeasurementLevel(scaleId, 'not valid'))).toThrow();
    });
  });

  describe('start selecting items', () => {

    it('should set correct state', () => {
      store.dispatch(operations.startSelectingItems());
      expect(selectors.isSelectingItems(getState())).toBe(true);
    });

    it('should set correct state on mouse up', () => {
      store.dispatch(operations.startSelectingItems());
      expect(selectors.isSelectingItems(getState())).toBe(true);
      store.dispatch(mouseUp());
      expect(selectors.isSelectingItems(getState())).toBe(false);
    });
  });

  describe('set scale scores', () => {

    const scaleId = 1;
    beforeEach(() => {
      store.dispatch(operations.createScale(scaleId));
    });

    it('should correctly set scale scores', () => {
      store.dispatch(operations.setScaleScores(scaleId, [1, 2, 3]));
      const scores = selectors.getScaleScores(selectors.getScaleById(getState(), scaleId));
      expect(scores.length).toBe(3);
      expect(scores).toEqual([1, 2, 3]);
    });

    it('should throw error for non-existent scale', () => {
      expect(() => store.dispatch(operations.setScaleScores(-555, [1, 2, 3]))).toThrow();
    });
  });

});