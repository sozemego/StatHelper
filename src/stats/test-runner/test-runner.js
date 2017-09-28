import {CORRELATION} from '../../experimental-design/model/test';
import {checkNormal, pearson, spearman} from './statistics';

export const runTest = test => {
	const runner = testRunners[test.type];
	if (!runner) {
		throw new Error('Invalid test type! ' + test.type);
	}
	return testRunners[test.type](test);
};

const correlation = test => {
	const {scales} = test;

	if (!scales || scales.length < 2) {
		throw new Error('You need to have at least two scales to run a correlation test.');
	}

	//TODO warn if invalid measurement level

	// first check normality of all scales
	const normalDistributionResults = {};
	for (let i = 0; i < scales.length; i++) {
		const scale = scales[i];
		normalDistributionResults[scale.name] = checkNormal(scale.result);
	}

	const results = [];

	// next step is to get all possible correlation pairs
	const allPairs = getAllPairs(scales);

	// run a correlation test for each pair
	for (let i = 0; i < allPairs.length; i++) {
		const firstScale = allPairs[i][0];
		const secondScale = allPairs[i][1];
		const firstScaleNormal = normalDistributionResults[firstScale.name];
		const secondScaleNormal = normalDistributionResults[secondScale.name];
		if (!firstScaleNormal || !secondScaleNormal) {
			const result = spearman(firstScale.result, secondScale.result);
			results.push(result);
		} else {
			const result = pearson(firstScale.result, secondScale.result);
			results.push(result);
		}
	}

	return results;
	//TODO summarize tests pair -> result
};

const getAllPairs = scales => {
	const pairs = [];
	for (let i = 0; i < scales.length; i++) {
		for (let j = i + 1; j < scales.length; j++) {
			pairs.push([scales[i], scales[j]]);
		}
	}
	return pairs;
};

const testRunners = {
	[CORRELATION]: correlation
};

