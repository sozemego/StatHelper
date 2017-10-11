import {TEST_TYPES} from './test-constants';

let testsCreated = 0;

export const createNewTest = () => {
  const name = 'Test ' + ++testsCreated;
  const type = TEST_TYPES[0];
  const scales = [];

  return {
    name,
    type,
    scales
  };
};