import experimentalDesign from '../../src/experimental-design/reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import operations from '../../src/experimental-design/operations';
import selectors from '../../src/experimental-design/selectors';
import {TEST_TYPES} from '../../src/experimental-design/model/test-constants';
import {mouseUp} from '../../src/common/actions/common-actions';

let store;
let getState;

const reducers = combineReducers({
  experimentalDesign
});

beforeEach(() => {
  store = createStore(
    reducers,
    applyMiddleware(
      thunkMiddleware
    ));
  getState = () => selectors.experimentalDesignRoot(store.getState());
});

describe('experimental design operations', () => {

  describe('createTest operation', () => {
    it('should create a new test', () => {
      store.dispatch(operations.createTest());
      const tests = selectors.getTests(getState());
      expect(tests.length).toBe(1);
      expect(selectors.getTestId(tests[0])).toBeDefined();
    });

    it('should create two tests after being called twice', () => {
      store.dispatch(operations.createTest());
      store.dispatch(operations.createTest());
      const tests = selectors.getTests(getState());
      expect(tests.length).toBe(2);
      expect(selectors.getTestId(tests[0])).toBeDefined();
      expect(selectors.getTestId(tests[1])).toBeDefined();
    });

    it('should create test with given id', () => {
      store.dispatch(operations.createTest(1));
      store.dispatch(operations.createTest('abc'));
      const tests = selectors.getTests(getState());
      expect(tests.length).toBe(2);
      expect(selectors.getTestId(tests[0])).toBe(1);
      expect(selectors.getTestId(tests[1])).toBe('abc');
    });

    it('should not automatically select the created test', () => {
      store.dispatch(operations.createTest(1));
      const tests = selectors.getTests(getState());
      expect(tests.length).toBe(1);
      expect(selectors.getSelectedTest(getState())).toBeUndefined();
    });

    it('should throw error if attempting to create test with already existing test id', () => {
      store.dispatch(operations.createTest(1));
      expect(() => store.dispatch(operations.createTest(1))).toThrow();
    });
  });

  describe('select test', () => {

    const testId = 1;
    beforeEach(() => {
      store.dispatch(operations.createTest(testId));
    });

    it('should not fail for non-existent test', () => {
      store.dispatch(operations.selectTest('abc'));
      expect(selectors.getSelectedTestId(getState())).toBe('abc');
      expect(selectors.getSelectedTest(getState())).toBe(undefined);
    });

    it('should correctly select a test', () => {
      store.dispatch(operations.selectTest(testId));
      expect(selectors.getSelectedTestId(getState())).toBe(testId);
      expect(selectors.getSelectedTest(getState())).toBeDefined();
    });

    it('should correctly select a test among many', () => {
      const testIdToCheck = 1000;
      for (let i = 900; i < 1500; i++) {
        store.dispatch(operations.createTest(i));
      }
      store.dispatch(operations.selectTest(testIdToCheck));
      expect(selectors.getSelectedTestId(getState())).toBe(testIdToCheck);
      expect(selectors.getSelectedTest(getState())).toBeDefined();
    });
  });

  describe('toggle scale', () => {

    const testId = 1;
    beforeEach(() => {
      store.dispatch(operations.createTest(testId));
    });

    it('should correctly select all given scales', () => {
      store.dispatch(operations.startSelectingScales());
      store.dispatch(operations.toggleScale(testId, 0));
      store.dispatch(operations.toggleScale(testId, 1));
      store.dispatch(operations.toggleScale(testId, 2));
      store.dispatch(operations.toggleScale(testId, 3));
      store.dispatch(operations.toggleScale(testId, 4));
      store.dispatch(operations.toggleScale(testId, 5));
      const test = selectors.getTestById(getState(), testId);
      expect(selectors.getTestScales(test).length).toBe(6);
      expect(selectors.getTestScales(test)[0]).toBe(0);
      expect(selectors.getTestScales(test)[1]).toBe(1);
      expect(selectors.getTestScales(test)[2]).toBe(2);
      expect(selectors.getTestScales(test)[3]).toBe(3);
      expect(selectors.getTestScales(test)[4]).toBe(4);
      expect(selectors.getTestScales(test)[5]).toBe(5);
    });

    it('should correctly toggle and untoggle scales', () => {
      store.dispatch(operations.startSelectingScales());
      //toggle
      store.dispatch(operations.toggleScale(testId, 0));
      store.dispatch(operations.toggleScale(testId, 1));
      store.dispatch(operations.toggleScale(testId, 2));
      store.dispatch(operations.toggleScale(testId, 3));
      store.dispatch(operations.toggleScale(testId, 4));
      store.dispatch(operations.toggleScale(testId, 5));
      //untoggle
      store.dispatch(operations.toggleScale(testId, 3));
      store.dispatch(operations.toggleScale(testId, 4));
      store.dispatch(operations.toggleScale(testId, 5));
      const test = selectors.getTestById(getState(), testId);
      expect(selectors.getTestScales(test).length).toBe(3);
      expect(selectors.getTestScales(test)[0]).toBe(0);
      expect(selectors.getTestScales(test)[1]).toBe(1);
      expect(selectors.getTestScales(test)[2]).toBe(2);
    });

    it('should throw error for non-existing test', () => {
      store.dispatch(operations.startSelectingScales());
      expect(() => store.dispatch(operations.toggleScale(-5000, 0))).toThrow();
    });
  });

  describe('set test name', () => {

    const testId = 1;
    beforeEach(() => {
      store.dispatch(operations.createTest(testId));
    });

    it('should correctly change test name', () => {
      const changeTo = Math.random() + '';
      expect(selectors.getTestName(selectors.getTestById(getState(), testId))).not.toBe(changeTo);
      store.dispatch(operations.setTestName(testId, changeTo));
      expect(selectors.getTestName(selectors.getTestById(getState(), testId))).toBe(changeTo);
    });

    it('should throw error for non-existing test', () => {
      expect(() => store.dispatch(operations.setTestName(-9999, 'NEW_NAME'))).toThrow();
    });

    it('should fail to change name for null or undefined name', () => {
      store.dispatch(operations.setTestName(testId, null));
      expect(selectors.getTestName(selectors.getTestById(getState(), testId))).not.toBe(null);
    });

    it('should fail to change name for all whitespace name', () => {
      store.dispatch(operations.setTestName(testId, '    '));
      expect(selectors.getTestName(selectors.getTestById(getState(), testId))).not.toBe('    ');
    });
  });

  describe('remove test', () => {

    const testId = 1;
    beforeEach(() => {
      store.dispatch(operations.createTest(testId));
    });

    it('should remove a test', () => {
      let tests = selectors.getTests(getState());
      expect(tests.length).toBe(1);
      store.dispatch(operations.removeTest(testId));
      tests = selectors.getTests(getState());
      expect(tests.length).toBe(0);
    });

    it('should remove a test from many', () => {
      store.dispatch(operations.createTest(2));
      store.dispatch(operations.createTest(3));

      let tests = selectors.getTests(getState());
      expect(tests.length).toBe(3);
      store.dispatch(operations.removeTest(testId));
      tests = selectors.getTests(getState());
      expect(tests.length).toBe(2);
    });

    it('should throw error for non-existent test', () => {
      expect(() => store.dispatch(operations.removeTest('ABC'))).toThrow();
    });
  });

  describe('start selecting scales', () => {

    it('should set correct state', () => {
      store.dispatch(operations.startSelectingScales());
      expect(selectors.isSelectingScales(getState())).toBe(true);
    });

    it('should set correct state on mouse up', () => {
      store.dispatch(operations.startSelectingScales());
      expect(selectors.isSelectingScales(getState())).toBe(true);
      store.dispatch(mouseUp());
      expect(selectors.isSelectingScales(getState())).toBe(false);
    });
  });

});