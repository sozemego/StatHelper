/**
	Object which encapsulates the experimental design of user's
	research. It contains all defined scales (which themselves contain encodings,
	transforms and filters), indepentent variables (experimental conditions),
	descriptive statistics and statistical tests to use.
*/
export default class ExperimentalDesign {

	constructor() {
		this.scales = [];
		this.summaries = [];
		this.getScales = this.getScales.bind(this);
		this.getScale = this.getScale.bind(this);
		this.exists = this.exists.bind(this);
		this.setDescriptives = this.setDescriptives.bind(this);
		this.getDescriptives = this.getDescriptives.bind(this);
	}

	/**
		Returns true if adding the scale was successful, false otherwise.
		Adding the scale is unsuccessful if the scale is undefined or
		a scale with the same name already exists.
	*/
	addScale(scale) {
		if(scale) {
			if(!this.exists(scale.name)) {
				this.scales.push(scale);
				return true;
			}
		}
		return false;
	}

	/**
		Returns true if a scale with given name already exists,
		false otherwise.
	*/
	exists(name) {
		for(var i = 0; i < this.scales.length; i++) {
			if(this.scales[i].name === name) {
				return true;
			}
		}
		return false;
	}

	getScales() {
		return this.scales;
	}

	getScale(index) {
		return this.scales[index];
	}

	setDescriptives(summaries) {
		this.summaries = summaries;
	}

	getDescriptives() {
		return this.summaries;
	}

}
