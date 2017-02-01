export default class ExperimentalDesign {

	constructor() {
		this.scales = [];
		this.getScales = this.getScales.bind(this);
	}

	addScale(scale) {
		if(scale) {
			this.scales.push(scale);
		}
	}

	getScales() {
		return this.scales;
	}

}
