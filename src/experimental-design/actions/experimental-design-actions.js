import {createNewTest, TEST_TYPES} from "../model/test";

export const ADD_TEST = "ADD_TEST";
const addTest = (test) => {
    return {
        type: ADD_TEST,
        test
    }
};

export const createTest = () => {
    return (dispatch, getState) => {
        dispatch(addTest(createNewTest()));
        const allTests = getState().experimentalDesign.tests;
        dispatch(selectTest(allTests.length - 1));
    }
};

export const SELECT_TEST = "SELECT_TEST";
export const selectTest = (testIndex) => {
    return {
        type: SELECT_TEST,
        testIndex
    }
};

export const setTestName = (testIndex, testName) => {
    return (dispatch, getState) => {
        if(isTestNameValid(testName)) {
            const tests = getState().experimentalDesign.tests;
            const test = tests[testIndex];
            test.name = testName;
            dispatch(setTests([].concat(tests)));
        }
    }
};

const isTestNameValid = (testName) => {
    return (testName || testName.trim());
};

export const SET_TESTS = "SET_TESTS";
export const setTests = (tests) => {
    return {
        type: SET_TESTS,
        tests
    }
};

export const setTestType = (testIndex, testType) => {
    return (dispatch, getState) => {
        if(isTestTypeValid(testType)) {
            const tests = getState().experimentalDesign.tests;
            const test = tests[testIndex];
            test.type = testType;
            dispatch(setTests([].concat(tests)));
        }
    };
};

const isTestTypeValid = (testType) => {
    return TEST_TYPES.findIndex(type => type === testType) > -1;
};

export const removeTest = (testIndex) => {
    return (dispatch, getState) => {
        dispatch(selectTest(-1));
        const tests = getState().experimentalDesign.tests.slice();
        tests.splice(testIndex, 1);
        dispatch(setTests(tests));
    };
};