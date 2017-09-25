export const MEASUREMENT_LEVELS = ['Nominal', 'Ordinal', 'Ratio'];

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