import {CORRELATION} from '../../experimental-design/model/test';
import {checkNormal, spearman} from './statistics';

export const runTest = test => {
	return testRunners[test.type](test);
};

const correlation = test => {

	//TODO throw error if only 1 scale

	const {scales} = test;

	if (!scales || scales.length < 2) {
		throw new Error('');
	}

	// first check normality of all scales
	const normalDistributionResults = [];
	for (let i = 0; i < scales.length; i++) {
		const scale = scales[i];
		normalDistributionResults.push(checkNormal(scale.result));
	}

	//TODO get all possible pairs
	//TODO for each pair check if both normal or not
	//TODO for each pair, run test

	const allNormal = checkAllNormal(normalDistributionResults);
	if (allNormal) {
		console.log('pearson');
	} else {


		const result = spearman(scales[0].result, scales[1].result);
		console.log(result);
	}

	//TODO summarize tests pair -> result
};

const checkAllNormal = normalDistributionResults => {
	for (let i = 0; i < normalDistributionResults.length; i++) {
		if (normalDistributionResults[i] === false) {
			return false;
		}
	}
	return true;
};

const testRunners = {
	[CORRELATION]: correlation
};

