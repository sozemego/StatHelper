import {NOTIFY_NUMBER_TESTS, NOTIFY_NUMBER_TESTS_REMAINING, RUN_TESTS, TESTS_DONE} from '../actions/stats-actions';

const initialState = {
	results: [],
	testsRunning: false,
	amountOfRunningTests: 0,
	amountOfRunningTestsRemaining: 0
};

const stats = (state = initialState, action) => {
	switch (action.type) {
		case RUN_TESTS:
			return {...state, testsRunning: true};
		case NOTIFY_NUMBER_TESTS:
			return {...state, amountOfRunningTests: action.tests};
		case NOTIFY_NUMBER_TESTS_REMAINING:
			return {...state, amountOfRunningTestsRemaining: action.tests};
		case TESTS_DONE:
			return {...state, amountOfRunningTests: 0, testsRunning: false};
		default:
			return state;
	}
};

export default stats;