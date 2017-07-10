import {ADD_TEST, SELECT_TEST} from "../actions/experimental-design-actions";

const initialState = {
    tests: [],
    selectedTest: -1
};

const experimentalDesign = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEST: return {...state, tests: addTest(action.test, state.tests)};
        case SELECT_TEST: return {...state, selectedTest: action.testIndex};
        default: return state;
    }
};

const addTest = (test, tests) => {
    return tests.concat([test]);
};

export default experimentalDesign;