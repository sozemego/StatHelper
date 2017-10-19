import uuid from 'uuid/v4';
import {TEST_TYPES} from './test-constants';

let testsCreated = 0;

export const createNewTest = (id) => {
  const testId = id || randomTestId();
  const name = 'Test ' + ++testsCreated;
  const type = TEST_TYPES[0];
  const scales = [];

  return {
    testId,
    name,
    type,
    scales
  };
};

export const randomTestId = () => uuid();