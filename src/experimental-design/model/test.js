export const CORRELATION = 'CORRELATION';
export const TEST_TYPES = [CORRELATION];

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