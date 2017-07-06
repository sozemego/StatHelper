export const SCALE_MEASUREMENT_LEVELS = ["Nominal", "Ordinal", "Ratio"];


let scalesCreated = 0;
export const createNewScale = () => {
    const name = "Scale" + ++scalesCreated;
    const measurementLevel = SCALE_MEASUREMENT_LEVELS[0];
    return {
        name,
        measurementLevel
    }
};