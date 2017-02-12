import React from "react";

/**
	Creates IndependentVariable groups. Groups consist of items,
	each with a level of measurement. A group also has a type, either design
	or additional.
*/
export default class IndependentVariableCreator extends React.Component {

	constructor(props) {
		super(props);
		this.getPairs = this.getPairs.bind(this);
		this.getPair = this.getPair.bind(this);
		this.onItemChange = this.onItemChange.bind(this);
		this.onTypeChange = this.onTypeChange.bind(this);
		this.createGroup = this.createGroup.bind(this);
		this.state = {
			variables: [],
			type: "design"
		};
	}

	render() {
		const pairs = this.getPairs();
		const button = this.getCreateButton();

		return(
			<div>
				{pairs}
				{button}
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

		pairs.push(this.getPair({item: "", level: "nominal"}, pairs.length));
		return pairs;
	}

	/**
		Creates a dom representation of a pair.
	*/
	getPair(item, index) {
		return(
			<div>
				<input name="item" type="Text" value={item.item} onChange={this.onItemChange.bind(null, index)}></input>
				<span>Level of measurement</span>
				<select name="level" onChange={this.onItemChange.bind(null, index)} selected = {item.level}>
					<option value="nominal">nominal</option>
					<option value="ordinal">ordinal</option>
					<option value="ratio">ratio</option>
				</select>
			</div>
		);
	}

	/**
		onChange handler.
	*/
	onItemChange(index, event) {
		const variables = this.state.variables;

		let variable;
		if(!(variable = variables[index])) {
			variable = {level: "nominal"};
			variables.push(variable);
		}

		if(event.target.name === "item") {
			variable.item = event.target.value;
		}
		if(event.target.name === "level") {
			variable.level = event.target.value;
		}

		this.setState({variables: variables});
	}

	getCreateButton() {
		return(
			<div>
				<span>type</span>
				<select onChange={this.onTypeChange} selected = {this.state.type}>
					<option value="design">design</option>
					<option value="additional">additional</option>
				</select>
				<button onClick={this.createGroup}>Create group</button>
			</div>
		);
	}

	onTypeChange(event) {
		this.setState({type: event.target.value});
	}

	createGroup() {
		const variables = this.state.variables;
		const validVariables = variables.filter(function(item) {
			return item.item;
		});

		if(validVariables.length === 0) {
			return;
		}

		const group = {
			variables: validVariables,
			type: this.state.type
		};
		this.setState({
			variables: [],
			type: "design"
		});
		this.props.onGroupCreate(group);
	}

}
