import React from "react";

const CONFIGURATION = {
	NOMINAL: 1,
	ORDINAL: 2,
	NOMINAL_ORDINAL: 3,
	RATIO: 4,
	MIX: 5
};

const TEST = {
	T_TEST: "Student's t-test",
	PAIRED_T_TEST: "Paired student's t-test",
	U_MANN_WHITNEY: "U-Mann-Whitney",
	WILCOXON: "Wilcoxon",
	ANOVA: "ANOVA",
	REPEATED_ANOVA: "Repeated measures ANOVA",
	KRUSKAL_WALLIS: "Kruskal-Wallis",
	FRIEDMAN: "Friedman",
	PEARSON: "Pearson's correlation coefficient",
	SPEARMAN: "Spearman's correlation coefficient",
	CHI_SQUARE: "Chi Square"
};

/**
* Automatically finds appropriate tests for each IV group.
* Also allows for manual choice of a test.
*/
export default class TestConfigurer extends React.Component {

	constructor(props) {
		super(props);
		this.findTests = this.findTests.bind(this);
		this.state = {
			tests: [

			]
		};
	}

	render() {

		const tests = this.getTests();

		return(
			<div>
				<p className = "lead text-center">Test configurer</p>
				<button onClick={this.findTests}>Find tests</button>
				{tests}
			</div>
		);
	}

	getTests() {
		return this.state.tests.map(function(item) {
			return this.getTest(item);
		}.bind(this));
	}

	getTest(item) {
		let tests = [];
		for(let i = 0; i < item.tests.length; i++) {
			let test = item.tests[i];
			tests.push(<li>Scale: {test.scale.name}. Test: {test.test}</li>);
		}
		const groupName = item.name;
		return(
			<div>
				<p>{groupName}</p>
				<ul>
					{tests}
				</ul>
			</div>
		);
	}

	findTests() {
		const groups = this.props.design.groups;
		const data = this.props.design.data;

		const arr = [];
		for(let i = 0; i < groups.length; i++) {
			let tests = this.findTestForGroup(groups[i]);
			arr.push({group: groups[i].name, tests: tests});
		}

		this.setState({
			tests: arr
		});

	}

	/**
	* Checks which configuration of variables is present.
	* CONFIGURATION constant holds possible returned values.
	*/
	determineConfiguration(group) {
		const variables = group.variables;
		let containsRatio = this.containsRatio(variables);
		let containsOrdinal = this.containsOrdinal(variables);
		let containsNominal = this.containsNominal(variables);

		if(containsNominal && !(containsOrdinal || containsRatio)) {
			return CONFIGURATION.NOMINAL;
		}

		if(containsOrdinal && !(containsNominal || containsRatio)) {
			return CONFIGURATION.ORDINAL;
		}

		if(containsRatio && !(containsNominal || containsOrdinal)) {
			return CONFIGURATION.RATIO;
		}

		if(containsNominal && containsOrdinal && !containsRatio) {
			return CONFIGURATION.NOMINAL_ORDINAL;
		}
		return CONFIGURATION.MIX;
	}

	findTestForGroup(group) {
		const configuration = this.determineConfiguration(group);

		switch(configuration) {
			case CONFIGURATION.NOMINAL: return this.allVariablesNominal(group);
			case CONFIGURATION.ORDINAL: return this.allVariablesOrdinal(group);
			case CONFIGURATION.NOMINAL_ORDINAL: return this.allVariablesOrdinalOrNominal(group);
			case CONFIGURATION.RATIO: return this.allVariablesRatio(group);
			case CONFIGURATION.MIX:	return this.mix(group);
		}
	}

	containsNominal(variables) {
		return variables.filter(i => i.level === "nominal").length > 0;
	}

	containsOrdinal(variables) {
		return variables.filter(i => i.level === "ordinal").length > 0;
	}

	containsRatio(variables) {
		return variables.filter(i => i.level === "ratio").length > 0;
	}

	allVariablesNominal(group) {
		const scales = this.props.design.scales;
		let tests = [];
		for(let i = 0; i < scales.length; i++) {
			const scale = scales[i];
			const level = scale.level;

			let test = {};
			if(level === "nominal") {
				test.test = TEST.CHI_SQUARE;
			}

			if(level === "ordinal") {
				test.test = TEST.KRUSKAL_WALLIS;
			}

			if(level === "ratio") {
				test.test = TEST.ANOVA;
			}
			test.scale = scale;
			tests.push(test);
		}
		return tests;
	}

	allVariablesOrdinal(group) {
		const scales = this.props.design.scales;
		let tests = [];
		for(let i = 0; i < scales.length; i++) {
			const scale = scales[i];
			const level = scale.level;

			let test = {};
			if(level === "nominal") {
				test.test = TEST.KRUSKAL_WALLIS;
			}
			if(level === "ordinal") {
				test.test = TEST.PEARSON;
			}
			if(level === "ratio") {
				test.test = TEST.PEARSON;
			}
			test.scale = scale;
			tests.push(test);

		}
		return tests;
	}

	allVariablesOrdinalOrNominal(group) {
		const scales = this.props.design.scales;
		let tests = [];
		for(let i = 0; i < scales.length; i++) {
			const scale = scales[i];
			const level = scale.level;

			let test = {};
			if(level === "nominal") {
				test.test = TEST.CHI_SQUARE;
			}
			if(level === "ordinal") {
				test.test = TEST.CHI_SQUARE;
			}
			if(level === "ratio") {
				test.test = TEST.ANOVA;
			}
			test.scale = scale;
			tests.push(test);

		}
		return tests;
	}

	allVariablesRatio(group) {
		const scales = this.props.design.scales;
		let tests = [];
		for(let i = 0; i < scales.length; i++) {
			const scale = scales[i];
			const level = scale.level;

			let test = {};
			if(level === "nominal") {
				test.test = TEST.ANOVA;
			}
			if(level === "ordinal") {
				test.test = TEST.SPEARMAN;
			}
			if(level === "ratio") {
				test.test = TEST.PEARSON;
			}
			test.scale = scale;
			tests.push(test);

		}
		return tests;
	}

	mix(group) {
		const scales = this.props.design.scales;
		let tests = [];
		for(let i = 0; i < scales.length; i++) {
			const scale = scales[i];
			const level = scale.level;
			let test = {};
			tests.push(test);
		}
		return tests;
	}

}
