import {Vector, Normality} from 'jerzy';
import {CORRELATION} from '../../experimental-design/model/test';
import {checkNormal, spearman} from './statistics';

export const runTest = test => {
	return testRunners[test.type](test);
};

const correlation = test => {
	console.log(test);

	const {scales} = test;
	// first check normality of all scales
	const normalDistributionResults = [];
	for (let i = 0; i < scales.length; i++) {
		const scale = scales[i];
		normalDistributionResults.push(checkNormal(scale.result));
	}

	const allNormal = checkAllNormal(normalDistributionResults);
	if (allNormal) {
		console.log('pearson');
	} else {
		const result = spearman(scales[0].result, scales[1].result);
		console.log(result);
	}
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

