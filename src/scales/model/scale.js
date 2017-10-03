export const NOMINAL = 'NOMINAL';
export const ORDINAL = 'ORDINAL';
export const RATIO = 'RATIO';
export const MEASUREMENT_LEVELS = [NOMINAL, ORDINAL, RATIO];

let scalesCreated = 0;
export const createNewScale = () => {
	const name = 'Scale' + ++scalesCreated;
	const measurementLevel = MEASUREMENT_LEVELS[0];
	const items = [];
	return {
		name,
		measurementLevel,
		items
	};
};

export const isMeasurementLevelValid = (measurementLevel) => {
	return MEASUREMENT_LEVELS.find((level) => level === measurementLevel);
};