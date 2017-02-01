export default class ExperimentalDesign {

	constructor() {
		this.scales = [];
		this.getScales = this.getScales.bind(this);
		this.getScale = this.getScale.bind(this);
	}

	addScale(scale) {
		if(scale) {
			this.scales.push(scale);
		}
	}

	getScales() {
		return this.scales;
	}

	getScale(index) {
		return this.scales[index];
	}

}
