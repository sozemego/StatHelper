export default class ExperimentalDesign {

	constructor() {
		this.scales = [];
		this.summaries = [];
		this.getScales = this.getScales.bind(this);
		this.getScale = this.getScale.bind(this);
		this.exists = this.exists.bind(this);
		this.setSummaries = this.setSummaries.bind(this);
		this.getSummaries = this.getSummaries.bind(this);
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

	setSummaries(summaries) {
		this.summaries = summaries;
	}

	getSummaries() {
		return this.summaries;
	}

}
