import simpleStats, {cumulativeStdNormalProbability, standardNormalTable, sum} from 'simple-statistics';

export const checkNormal = result => {
	const vector = new Vector(result);
	const shapiroWilk = Normality.shapiroWilk(vector);
	return shapiroWilk.p > 0.05;
};

// taken from https://github.com/agrueneberg/Spearson/
export const spearman = (result1, result2) => {

	result1 = rank(result1);
	result2 = rank(result2);

	const deviation1 = deviation(result1);
	const deviation2 = deviation(result2);

	const spearmanCoefficient = sum(deviation1.map((xi, i) => {
		return xi * deviation2[i];
	})) / Math.sqrt(sum(deviation1.map(xi => {
		return Math.pow(xi, 2);
	})) * sum(deviation2.map(yi => {
		return Math.pow(yi, 2);
	})));

	const pValue = spearmanSignificance(spearmanCoefficient, result1.length);

	return {
		coefficient: spearmanCoefficient,
		pValue
	};
};

const spearmanSignificance = (coefficient, sampleSize) => {

	//https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient#Determining_significance
	const fisherTransformation = Math.atanh(coefficient);
	const toSqrt = (sampleSize - 3) / 1.06;
	const sqrt = Math.sqrt(toSqrt);
	const z = fisherTransformation * sqrt;

	return cumulativeStdNormalProbability(z);
};

const rank = values => {
	const sorted = sort(values);
	const ranks = new Array(values.length);
	for (let i = 0; i < values.length; i++) {
		let rank, first, last;
		// Handle tied ranks.
		first = sorted.indexOf(values[i]);
		last = sorted.lastIndexOf(values[i]);
		if (first === last) {
			rank = first;
		} else {
			rank = (first + last) / 2;
		}
		// Add 1 because ranks start with 1.
		ranks[i] = rank + 1;
	}
	return ranks;
};

const sort = arr => {
	const copy = arr.slice();
	copy.sort((a, b) => a - b);
	return copy;
};

/**
 * For each element of the array, returns a difference between value of the element
 * and array mean.
 * @param values
 * @returns {Array}
 */
const deviation = values => {
	const mean = simpleStats.mean(values);
	const result = new Array(values.length);
	for (let i = 0; i < values.length; i++) {
		result[i] = values[i] - mean;
	}
	return result;
};
