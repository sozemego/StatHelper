import {
	ADD_TEST, SELECT_SCALES, SELECT_TEST, SET_TESTS,
	START_SELECTING_SCALES
} from '../actions/experimental-design-actions';
import {MOUSE_UP} from '../../common/actions/common-actions';

const initialState = {
	tests: [],
	selectedTest: -1
};

const experimentalDesign = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TEST:
			return {...state, tests: addTest(action.test, state.tests)};
		case SELECT_TEST:
			return {...state, selectedTest: action.testIndex};
		case SET_TESTS:
			return {...state, tests: action.tests};
		case START_SELECTING_SCALES:
			return {...state, selectingItems: true};
		case MOUSE_UP:
			return {...state, selectingItems: false};
		case SELECT_SCALES:
			return {...state, tests: selectScales(state.tests, action.testIndex, action.selectedScales)};

		default:
			return state;
	}
};

const selectScales = (tests, testIndex, selectedScales) => {
	const selectedTest = tests[testIndex];
	selectedTest.scales = selectedScales;
	return tests.slice();
};

const addTest = (test, tests) => {
	return tests.concat([test]);
};

export default experimentalDesign;