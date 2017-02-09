import React from "react";

/**
	A component for defining independent variables. Independent variables
	for instance are your experimental conditions (groups), or items like
	gender or age.
*/
export default class IndependentVariables extends React.Component {

	constructor(props) {
		super(props);
		this.getPairs = this.getPairs.bind(this);
		this.getPair = this.getPair.bind(this);
		this.onItemChange = this.onItemChange.bind(this);
		this.state = {variables: []};
	}

	render() {
		const pairs = this.getPairs();

		return(
			<div className="container">
				<p className = "lead text-center">Independent Variables</p>
				<p className = "text-center">Independent variables are your items that
					you suspect will affect values of other items. These include your experimental conditions
					(e.g. control vs experimental group), age or gender. Those included in your experimental design
					(like experimental conditions) mark as design, additional items (age etc) mark as additional.
				</p>
				<div className = "text-center">
					{pairs}
				</div>
			</div>
		);
	}

	/**
		Returns scale name/item number-level of measurement pairs as
		elements.
	*/
	getPairs() {
		const variables = this.state.variables;

		const pairs = variables.map(function(item, index) {
			return this.getPair(item, index);
		}.bind(this));

		pairs.push(this.getPair({item: ""}, pairs.length));
		return pairs;
	}

	/**
		Creates a dom representation of a pair.
	*/
	getPair(item, index) {
		return(
			<div>
				<input name="item" type="Text" value={item.item} onChange={this.onItemChange.bind(null, index)}></input>
				<span>type</span>
				<select name="type" onChange={this.onItemChange.bind(null, index)}>
					<option value="design">design</option>
					<option value="additional">additional</option>
				</select>
				<span>Level of measurement</span>
				<select name="level" onChange={this.onItemChange.bind(null, index)}>
					<option value="ratio">ratio</option>
					<option value="ordinal">ordinal</option>
					<option value="nominal">nominal</option>
				</select>
			</div>
		);
	}

	/**
		onChange handler.
	*/
	onItemChange(index, event) {
		const variables = this.state.variables;
		if(!variables[index]) {
			const iv = {type: "design", level: "ratio"};
			variables.push(iv);
		}
		const variable = variables[index];
		if(event.target.name === "item") {
			variable.item = event.target.value;
		}
		if(event.target.name === "type") {
			variable.type = event.target.value;
		}
		if(event.target.name === "level") {
			variable.level = event.target.value;
		}
		this.props.set(variables);
		this.setState({variables: variables});
	}

}
