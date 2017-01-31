export default class ExperimentalDesign {

	constructor() {
		this.scales = [];
		this.getScales = this.getScales.bind(this);
	}

	/**
		parentScale parameter should be the index of the scale, not its name
	*/
	addScale(scale, parentScale) {
		if(!scale) {
			return;
		}

		if(parentScale === undefined) {
			this.scales.push(scale);
			return;
		}

		const parentScaleObject = this.scales[parentScale];

		if(!parentScaleObject.subscales) {
			parentScaleObject.subscales = [];
		}

		parentScaleObject.subscales.push(scale);

	}

	getScales() {
		return this.scales;
	}

}
